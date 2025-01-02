import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { StudioNode } from '@/modules/Studio/types/graph';
import LegoRender from '../LegoRender';

const DraggingFloating = ({ data }: { data: StudioNode }) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const key = data.data.metadata.key;
  const option = categoryMap[key] as StudioCategoryMap;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={data.id}
      schemaData={option.data}
      categoryKey={option.key}
      readonly
      render={option.customizeRenderOnBoard}
    />
  );
};

export default DraggingFloating;
