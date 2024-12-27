import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { Handle, NodeProps, Position } from '@xyflow/react';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DataSchema, StudioCategoryMap } from '@/modules/Studio/types/category';
import { DraggableDataType } from '@/modules/Studio/types/dnd';
import { FunctionComponent, useMemo } from 'react';
import FormRender from '../../DataFields/FormRender';
import Package from '../../DnD/Package';
import Product from '../../DnD/Product';
import ProductAddon from '../../DnD/ProductAddon';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

type Props = NodeProps<StudioNode>;

const LegoRender = ({
  background,
  icon,
  id,
  schemaData,
  title,
  categoryId,
  readonly,
}: {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemaData?: DataSchema;
  title: React.ReactNode | FunctionComponent;
  categoryId: string;
  readonly?: boolean;
}) => {
  const fields = useMemo(() => Object.keys(schemaData || {}), [schemaData]);
  const isFixedHeight = useMemo(() => {
    if (fields.length === 0) {
      return true;
    }
    if (fields.length === 1) {
      const field = fields[0];
      const fieldData = (schemaData || {})[field];
      if (fieldData.type !== 'textarea') {
        return true;
      }
    }

    return false;
  }, [fields, schemaData]);

  return (
    <Lego background={background} icon={icon} fixedHeight={isFixedHeight}>
      <LegoContent>
        <FormRender readonly={readonly} categoryId={categoryId} id={id} schemaData={schemaData}>
          <TextRender data={title} />
        </FormRender>
      </LegoContent>
    </Lego>
  );
};

const DraggingFloating = ({ data }: { data: StudioNode }) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={data.id}
      schemaData={option.data}
      categoryId={option.keyMapper}
      readonly
    />
  );
};

const ChildBaseNode = ({
  data,
  items,
  index,
  belongsTo,
}: {
  data: StudioNode;
  items: StudioNode[];
  index: number;
  belongsTo: string;
}) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;

  const productData: Omit<DraggableDataType, 'type'> = useMemo(
    () => ({ optionId: option.key, belongsTo, childIndex: index }),
    [belongsTo, index, option.key],
  );

  const floatingItems = useMemo(() => items.slice(index), [items, index]);

  return (
    <ProductAddon
      id={data.id}
      data={productData}
      draggingFloating={
        <div>
          {floatingItems.map((item) => (
            <DraggingFloating key={`dragging-floating-${item.id}`} data={item} />
          ))}
        </div>
      }
    >
      <LegoRender
        background={option.color}
        icon={option.icon}
        title={option.title}
        id={data.id}
        schemaData={option.data}
        categoryId={option.keyMapper}
      />
    </ProductAddon>
  );
};

const BaseNodeReadonly = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={data.id}
      schemaData={schemaData}
      categoryId={option.keyMapper}
      readonly
    />
  );
};

const BaseNodeConnection = ({ data }: { data: StudioNode['data'] }) => {
  return (
    <>
      {data.sourceHandles?.map((handle, index) => (
        <Handle
          key={`${Position.Right}__${handle}__${index}`}
          id={handle}
          type="source"
          position={Position.Right}
          className="base-node__handle"
          isConnectable={false}
        />
      ))}
      {data.sourceHandles?.map((handle, index) => (
        <Handle
          key={`${Position.Top}__${handle}__${index}`}
          id={handle}
          type="source"
          position={Position.Top}
          className="base-node__handle"
          isConnectable={false}
        />
      ))}
      {data.sourceHandles?.map((handle, index) => (
        <Handle
          key={`${Position.Left}__${handle}__${index}`}
          id={handle}
          type="source"
          position={Position.Left}
          className="base-node__handle"
          isConnectable={false}
        />
      ))}
      {data.sourceHandles?.map((handle, index) => (
        <Handle
          key={`${Position.Bottom}__${handle}__${index}`}
          id={handle}
          type="source"
          position={Position.Bottom}
          isConnectable={false}
          className="base-node__handle"
        />
      ))}
    </>
  );
};

const BaseNodeMultipleItem = ({ data, ...rest }: Props) => {
  const draggingData = useStudioDndStore((state) => state.draggingData);
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);
  const children = data?.metadata?.children;

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const productData: Omit<DraggableDataType, 'type'> = useMemo(
    () => ({ optionId: option.key, belongsTo: data.id }),
    [data.id, option.key],
  );

  const childIndexMoving = useMemo(
    () => children.findIndex((item) => data.id === draggingData?.belongsTo),
    [children, draggingData?.belongsTo],
  );

  const renderChildren = useMemo(() => {
    if (childIndexMoving > -1) {
      return children.slice(0, childIndexMoving + 1);
    }

    return children;
  }, [childIndexMoving, children]);

  return (
    <div
      className="base-node"
      style={{
        position: 'relative',
      }}
    >
      <Product
        id={data.id}
        data={productData}
        draggingFloating={
          <div>
            <BaseNodeReadonly {...rest} data={data} />
            {renderChildren.map((item) => (
              <DraggingFloating key={`dragging-floating-${item.id}`} data={item} />
            ))}
          </div>
        }
      >
        <LegoRender
          background={option.color}
          icon={option.icon}
          title={option.title}
          id={data.id}
          schemaData={schemaData}
          categoryId={option.keyMapper}
        />
      </Product>

      {renderChildren?.map((item, index) => (
        <ChildBaseNode
          index={index}
          key={`base-node-child-${item.id}`}
          data={item}
          items={children}
          belongsTo={data.id}
        />
      ))}

      <Package id={data.id} data={{ belongsTo: data.id }} />
      <BaseNodeConnection data={data} />
    </div>
  );
};

const BaseNodeSingleItem = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const productData: Omit<DraggableDataType, 'type'> = useMemo(
    () => ({ optionId: option.key, belongsTo: data.id }),
    [data.id, option.key],
  );

  return (
    <div
      className="base-node-wrapper"
      style={{
        position: 'relative',
      }}
    >
      <Product id={data.id} data={productData}>
        <LegoRender
          background={option.color}
          icon={option.icon}
          title={option.title}
          id={data.id}
          schemaData={schemaData}
          categoryId={option.keyMapper}
        />
      </Product>

      <Package id={data.id} data={{ belongsTo: data.id }} />
      <BaseNodeConnection data={data} />
    </div>
  );
};

export default function BaseNode(props: Props) {
  const { data } = props;
  const children = data?.metadata?.children;

  if (children.length) {
    return <BaseNodeMultipleItem {...props} />;
  }

  return <BaseNodeSingleItem {...props} />;
}
