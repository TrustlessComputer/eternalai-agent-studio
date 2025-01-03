import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { DraggableData } from '@/modules/Studio/types/dnd';
import { StudioNode } from '@/modules/Studio/types/graph';
import { useMemo } from 'react';
import ProductAddon from '../../../DnD/ProductAddon';
import DraggingFloating from '../DraggingFloating';
import LegoRender from '../LegoRender';

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
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const idx = data.data.metadata.idx;
  const option = categoryMap[idx] as StudioCategoryMap;

  const productData: Omit<DraggableData, 'type'> = useMemo(
    () => ({ optionKey: option.idx, belongsTo, childIndex: index }),
    [belongsTo, index, option.idx],
  );

  const floatingItems = useMemo(() => items.slice(index), [items, index]);

  return (
    <ProductAddon
      id={data.id}
      data={productData}
      draggingFloating={
        <div>
          {floatingItems.map((item) => (
            <DraggingFloating key={`dragging-floating-${data.id}-${item.id}`} data={item} />
          ))}
        </div>
      }
    >
      <LegoRender
        background={option.color}
        icon={option.icon}
        title={option.title}
        id={data.id}
        schemadata={option.data}
        idx={option.idx}
        render={option.customizeRenderOnBoard}
      />
    </ProductAddon>
  );
};

export default ChildBaseNode;
