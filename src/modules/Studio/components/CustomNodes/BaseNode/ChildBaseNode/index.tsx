import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { DraggableDataType } from '@/modules/Studio/types/dnd';
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
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const keyMapper = data.data.metadata.keyMapper;
  const option = mapCategories[keyMapper] as StudioCategoryMap;

  const productData: Omit<DraggableDataType, 'type'> = useMemo(
    () => ({ optionKey: option.keyMapper, belongsTo, childIndex: index }),
    [belongsTo, index, option.keyMapper],
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
        render={option.customizeRenderOnBoard}
      />
    </ProductAddon>
  );
};

export default ChildBaseNode;
