import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryOptionMapValue } from '@/modules/Studio/types/category';
import LegoRender from '../LegoRender';
import { BaseNodeProps } from '../types';

type Props = BaseNodeProps;

const BaseNodeReadonly = ({ data }: Props) => {
  const categoryOptionMap = useStudioCategoryStore((state) => state.categoryOptionMap);

  const idx = data.metadata.idx;
  const option: StudioCategoryOptionMapValue | undefined = categoryOptionMap[idx];
  const schemadata = option?.data;

  return (
    <LegoRender
      background={option?.color}
      icon={option?.icon}
      title={option?.title}
      id={data.id}
      schemadata={schemadata}
      idx={option?.idx}
      readonly
      render={option?.customizeRenderOnBoard}
    />
  );
};

export default BaseNodeReadonly;
