import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { StudioNode } from '@/modules/Studio/types/graph';
import LegoRender from '../LegoRender';

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
      render={option.customizeRenderOnBoard}
    />
  );
};

export default DraggingFloating;
