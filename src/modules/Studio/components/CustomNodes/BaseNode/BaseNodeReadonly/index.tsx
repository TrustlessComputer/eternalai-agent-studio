import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import LegoRender from '../LegoRender';
import { BaseNodeProps } from '../types';

type Props = BaseNodeProps;
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
      render={option.customizeRenderOnBoard}
    />
  );
};

export default BaseNodeReadonly;
