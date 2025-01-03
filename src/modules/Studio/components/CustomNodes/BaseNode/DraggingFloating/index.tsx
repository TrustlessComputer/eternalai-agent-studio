import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { StudioNode } from '@/modules/Studio/types/graph';
import LegoRender from '../LegoRender';

const DraggingFloating = ({ data }: { data: StudioNode }) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const idx = data.data.metadata.idx;
  const option = categoryMap[idx] as StudioCategoryMap;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={data.id}
      schemadata={option.data}
      idx={option.idx}
      readonly
      render={option.customizeRenderOnBoard}
    />
  );
};

export default DraggingFloating;
