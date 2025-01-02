import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import LegoRender from '../LegoRender';
import { BaseNodeProps } from '../types';

type Props = BaseNodeProps;

const BaseNodeReadonly = ({ data }: Props) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const key = data.metadata.key;
  const option = categoryMap[key] as StudioCategoryMap;
  const schemaData = option.data;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={data.id}
      schemaData={schemaData}
      categoryKey={option.key}
      readonly
      render={option.customizeRenderOnBoard}
    />
  );
};

export default BaseNodeReadonly;
