import cx from 'clsx';

import { StudioNode } from '@/modules/Studio/types/graph';
import './BaseNode.scss';

import { NodeProps } from '@xyflow/react';

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

const ChildBaseNode = ({ data }: { data: StudioNode }) => {
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
    />
  );
};
const BaseNode = ({ data }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);
  const children = data?.metadata?.children;

  const keyMapper = data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;
  const schemaData = option.data;

  const id = data.id;

  return (
    <div
      className="base-node-wrapper"
      style={{
        position: 'relative',
      }}
    >
      <Product id={id} data={{ optionId: option.key, nodeId: id }}>
        <div className={cx('base-node')} id={id}>
          <div className="base-node_content">
            <LegoRender
              background={option.color}
              icon={option.icon}
              title={option.title}
              id={id}
              schemaData={schemaData}
              categoryId={option.keyMapper}
            />

            {children?.map((item) => <ChildBaseNode key={`base-node-child-${item.id}`} data={item} />)}
          </div>
        </div>
      </Product>

      <Package id={id} data={{ nodeId: id }} />
    </div>
  );
};

export default BaseNode;
