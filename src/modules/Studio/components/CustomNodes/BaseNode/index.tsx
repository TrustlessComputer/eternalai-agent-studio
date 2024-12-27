import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { Handle, NodeProps, Position } from '@xyflow/react';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
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
}: {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemaData?: DataSchema;
  title: React.ReactNode | FunctionComponent;
  categoryId: string;
}) => {
  const fields = useMemo(() => Object.keys(schemaData || {}), [schemaData]);
  const isDynamicHeight = useMemo(() => fields.length > 1, [fields]);

  return (
    <Lego background={background} icon={icon} fixedHeight={!isDynamicHeight}>
      <LegoContent>
        <FormRender categoryId={categoryId} id={id} schemaData={schemaData}>
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

  const id = data.id;

  const productData = useMemo(() => ({ optionId: option.key, nodeId: id }), [id, option.key]);

  return (
    <Product id={id} data={productData}>
      <LegoRender
        background={option.color}
        icon={option.icon}
        title={option.title}
        id={id}
        schemaData={option.data}
        categoryId={option.keyMapper}
      />
    </Product>
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

const BaseNode = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);
  const children = data?.metadata?.children;

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const id = data.id;

  const productData = useMemo(() => ({ optionId: option.key, nodeId: id }), [id, option.key]);

  return (
    <div
      className="base-node"
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
      {children?.map((item) => <BaseNodeChild key={`base-node-child-${item.id}`} data={item} />)}

      <Package id={id} data={{ nodeId: id }} />

      <BaseNodeConnection data={data} />
    </div>
  );
};

export default BaseNode;
