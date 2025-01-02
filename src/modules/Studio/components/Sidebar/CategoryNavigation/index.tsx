import cx from 'clsx';
import { CSSProperties, useMemo } from 'react';

import ImageRender from '../../Render/ImageRender';
import TextRender from '../../Render/TextRender';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategory } from '@/modules/Studio/types/category';
import { adjustColorShade } from '@/modules/Studio/utils/ui';

import './CategoryNavigation.scss';

type Props = StudioCategory;

const CategoryNavigation = ({ key, icon, title, color = '#CC6234', customizeRenderOnNavigation }: Props) => {
  const { filters, setFilters } = useStudioCategoryStore();

  const isActive = useMemo(() => {
    return filters.includes(key) || filters.length === 0;
  }, [filters, key]);

  if (customizeRenderOnNavigation && typeof customizeRenderOnNavigation === 'function') {
    return customizeRenderOnNavigation();
  }

  return (
    <div
      onClick={() => {
        setFilters(key);
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
