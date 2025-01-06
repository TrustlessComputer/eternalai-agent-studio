import cx from 'clsx';
import { CSSProperties, useMemo } from 'react';

import ImageRender from '../../Render/ImageRender';
import TextRender from '../../Render/TextRender';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategory } from '@/modules/Studio/types/category';
import { adjustColorShade } from '@/modules/Studio/utils/ui';

import './CategoryNavigation.scss';

type Props = StudioCategory;

const CategoryNavigation = (props: Props) => {
  const { idx, icon, title, color = '#CC6234', customizeRenderOnNavigation } = props;

  const { filters, setFilters } = useStudioCategoryStore();

  const isActive = useMemo(() => {
    return filters.includes(idx) || filters.length === 0;
  }, [filters, idx]);

  if (customizeRenderOnNavigation && typeof customizeRenderOnNavigation === 'function') {
    return customizeRenderOnNavigation(props);
  }

  return (
    <div
      onClick={() => {
        setFilters(idx);
      }}
      className={cx('category-navigation', { 'category-navigation--active': isActive })}
      style={
        {
          '--color': color,
          '--border-color': adjustColorShade(color, -20),
        } as CSSProperties
      }
    >
      <ImageRender data={icon} />
      <span className="category-navigation__title">
        <TextRender data={title} />
      </span>
    </div>
  );
};

export default CategoryNavigation;
