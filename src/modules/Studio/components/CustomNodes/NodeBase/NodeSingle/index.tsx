import { useMemo } from 'react';

import Product from '../../../DnD/Product';
import ProductPlaceholder from '../../../DnD/ProductPlaceholder';
import LegoRender from '../LegoRender';
import NodeBaseConnection from '../NodeBaseConnection';
import NodeBaseWrapper from '../NodeBaseWrapper';
import { NodeBaseProps } from '../types';

import { StudioCategoryType } from '@/modules/Studio/enums';
import useNodeSelected from '@/modules/Studio/hooks/useNodeSelected';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryOptionMapValue } from '@/modules/Studio/types/category';
import { DraggableData } from '@/modules/Studio/types/dnd';

import './NodeSingle.scss';

type Props = NodeBaseProps;

const NodeSingle = ({ data }: Props) => {
  const { isSelected } = useNodeSelected({ id: data.id });

  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);
  const categoryOptionMap = useStudioCategoryStore((state) => state.categoryOptionMap);

  const idx = data.metadata.idx;
  const option: StudioCategoryOptionMapValue | undefined = categoryOptionMap[idx];
  const category = useMemo(() => {
    return Object.values(categoryMap).find((category) => category.options.some((option) => option.idx === idx));
  }, [categoryMap, idx]);

  const schemaData = option?.data;

  const productData: Omit<DraggableData, 'type'> = useMemo(
    () => ({
      optionKey: option?.idx,
      belongsTo: data.id,
      categoryKey: category?.idx,
      id: data.id,
    }),
    [data.id, option?.idx, category?.idx],
  );

  const highlightColor = useMemo(
    () => option?.highlightColor || category?.highlightColor || option?.color,
    [option, category],
  );

  return (
    <NodeBaseWrapper data={data} id={data.id} option={option} isDroppable>
      <div className="node-base">
        <div className="node-base__single">
          <Product id={data.id} data={productData}>
            <LegoRender
              background={isSelected ? highlightColor : option?.color}
              icon={option?.icon}
              title={option?.title}
              id={data.id}
              schemaData={schemaData}
              idx={option?.idx}
              render={option?.customizeRenderOnBoard}
            />
          </Product>
        </div>

        {((option.isLinkPackage && option.type === StudioCategoryType.LINK) ||
          option.type !== StudioCategoryType.LINK) && (
          <ProductPlaceholder id={data.id} data={productData} hidden={false} />
        )}

        <NodeBaseConnection />
      </div>
    </NodeBaseWrapper>
  );
};

export default NodeSingle;
