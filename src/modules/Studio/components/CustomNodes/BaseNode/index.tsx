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
  categoryKey,
  readonly,
}: {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemaData?: DataSchema;
  title: React.ReactNode | FunctionComponent;
  categoryKey: string;
  readonly?: boolean;
}) => {
  const fields = useMemo(() => Object.keys(schemaData || {}), [schemaData]);

  const isDynamicHeight = useMemo(() => {
    if (fields.length > 1) {
      return true;
    }

    const field = fields[0];
    const fieldData = (schemaData || {})[field];

    return fieldData?.type === 'textarea';
  }, [fields, schemaData]);

  const isFixedHeight = !isDynamicHeight;

  return (
    <Lego
      background={background}
      icon={icon}
      fixedHeight={isFixedHeight}
      style={{
        width: '100%',
      }}
    >
      <LegoContent>
        <FormRender readonly={readonly} categoryKey={categoryKey} id={id} schemaData={schemaData}>
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
      categoryKey={option.keyMapper}
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
    () => ({ optionKey: option.key, belongsTo, childIndex: index }),
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
        categoryKey={option.keyMapper}
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
      categoryKey={option.keyMapper}
      readonly
    />
  );
};

const BaseNodeConnection = () => {
  return (
    <>
      <Handle
        id="a"
        type="source"
        position={Position.Top}
        className="base-node__handles__handle"
        isConnectable={false}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="base-node__handles__handle"
        isConnectable={false}
      />
      <Handle
        id="c"
        type="source"
        position={Position.Bottom}
        className="base-node__handles__handle"
        isConnectable={false}
      />
      <Handle
        id="d"
        type="source"
        position={Position.Left}
        className="base-node__handles__handle"
        isConnectable={false}
      />
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
    () => ({ optionKey: option.key, belongsTo: data.id }),
    [data.id, option.key],
  );

  const renderChildren = useMemo(() => {
    if (!draggingData || draggingData.childIndex === undefined || draggingData.belongsTo !== data.id) return children;

    return children.slice(0, draggingData.childIndex + 1);
  }, [draggingData, children]);

  const packageData = useMemo(() => ({ belongsTo: data.id }), [data.id]);

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
          categoryKey={option.keyMapper}
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

      <Package id={data.id} data={packageData} />
      <BaseNodeConnection />
    </div>
  );
};

const BaseNodeSingleItem = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const productData: Omit<DraggableDataType, 'type'> = useMemo(
    () => ({ optionKey: option.key, belongsTo: data.id }),
    [data.id, option.key],
  );

  const packageData = useMemo(() => ({ belongsTo: data.id }), [data.id]);

  return (
    <div
      className="base-node-wrapper"
      style={{
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <Product id={data.id} data={productData}>
          <LegoRender
            background={option.color}
            icon={option.icon}
            title={option.title}
            id={data.id}
            schemaData={schemaData}
            categoryKey={option.keyMapper}
          />
        </Product>

        {/* <div className="base-node__handles">
          {data.sourceHandles?.map((handle, index) => (
            <Fragment key={handle}>
              <Handle
                id={handle}
                type="source"
                position={Position.Right}
                className="base-node__handles__handle"
                isConnectable={false}
              />
              <Handle
                id={handle}
                type="source"
                position={Position.Left}
                className="base-node__handles__handle"
                isConnectable={false}
              />
            </Fragment>
          ))}
        </div> */}
      </div>

      <Package id={data.id} data={packageData} />
      <BaseNodeConnection />
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
