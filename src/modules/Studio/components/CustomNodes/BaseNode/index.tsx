import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { Handle, NodeProps, Position } from '@xyflow/react';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DataSchema, StudioCategoryMap } from '@/modules/Studio/types/category';
import { FunctionComponent, useMemo } from 'react';
import FormRender from '../../DataFields/FormRender';
import Package from '../../DnD/Package';
import Product from '../../DnD/Product';
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
  const isDynamicHeight = useMemo(() => fields.length > 1, [fields]);

  return (
    <Lego background={background} icon={icon} fixedHeight={!isDynamicHeight}>
      <LegoContent>
        <FormRender readonly={readonly} categoryId={categoryId} id={id} schemaData={schemaData}>
          <TextRender data={title} />
        </FormRender>
      </LegoContent>
    </Lego>
  );
};

const BaseNodeChild = ({ data }: { data: StudioNode }) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;

  const nodeId = data.id;

  const productData = useMemo(() => ({ optionId: option.key, nodeId: nodeId }), [nodeId, option.key]);

  return (
    <Product id={nodeId} data={productData}>
      <LegoRender
        background={option.color}
        icon={option.icon}
        title={option.title}
        id={nodeId}
        schemaData={option.data}
        categoryId={option.keyMapper}
      />
    </Product>
  );
};

const BaseNodeReadonly = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const nodeId = data.id;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={nodeId}
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

const DraggingFloating = ({ data }: { data: StudioNode }) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;

  const id = data.id;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={id}
      schemaData={option.data}
      categoryId={option.keyMapper}
      readonly
    />
  );
};

const BaseNodeMultipleItem = ({ data, ...rest }: Props) => {
  const draggingData = useStudioDndStore((state) => state.draggingData);
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);
  const children = data?.metadata?.children;

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const nodeId = data.id;

  const productData = useMemo(() => ({ optionId: option.key, nodeId: nodeId }), [nodeId, option.key]);

  const childIndexMoving = useMemo(
    () => children.findIndex((item) => item.id === draggingData?.nodeId),
    [children, draggingData?.nodeId],
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
        id={nodeId}
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
          id={nodeId}
          schemaData={schemaData}
          categoryId={option.keyMapper}
        />
      </Product>

      <Package id={nodeId} data={{ nodeId }} />

      <BaseNodeConnection data={data} />
    </div>
  );
};

const BaseNodeSingleItem = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const id = data.id;

  const productData = useMemo(() => ({ optionId: option.key, nodeId: id }), [id, option.key]);

  return (
    <div
      className="base-node-wrapper"
      style={{
        position: 'relative',
      }}
    >
      <Product id={id} data={productData}>
        <LegoRender
          background={option.color}
          icon={option.icon}
          title={option.title}
          id={id}
          schemaData={schemaData}
          categoryId={option.keyMapper}
        />
      </Product>

      <Package id={id} data={{ nodeId: id }} />
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
