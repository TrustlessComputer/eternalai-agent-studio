import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import LegoRender from '../LegoRender';
import { BaseNodeProps } from '../types';

type Props = BaseNodeProps;

const BaseNodeReadonly = ({ data }: Props) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const idx = data.metadata.idx;
  const option = categoryMap[idx] as StudioCategoryMap;
  const schemadata = option.data;

  return (
    <LegoRender
      background={option.color}
      icon={option.icon}
      title={option.title}
      id={data.id}
      schemadata={schemadata}
      idx={option.idx}
      readonly
      render={option.customizeRenderOnBoard}
    />
  );
};

export default BaseNodeReadonly;
