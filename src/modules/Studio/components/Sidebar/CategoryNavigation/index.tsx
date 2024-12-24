import { CSSProperties, useMemo } from 'react';
import cs from 'clsx';

import ImageRender from '../../Render/ImageRender';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';
import { adjustColorShade } from '@/modules/Studio/utils/ui';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';

import './CategoryNavigation.scss';

type Props = StudioCategory;

const CategoryNavigation = ({ keyMapper, icon, title, color, required, customizeRenderOnNavigation }: Props) => {
  const { filters, setFilters } = useStudioCategoryStore();

  const isActive = useMemo(() => {
    return filters.includes(keyMapper) || filters.length === 0;
  }, [filters, keyMapper]);

  if (customizeRenderOnNavigation && typeof customizeRenderOnNavigation === 'function') {
    return customizeRenderOnNavigation({});
  }

  return (
    <div
      onClick={() => {
        setFilters(keyMapper);
      }}
      className={cs('category-navigation', { 'category-navigation__active': isActive })}
      style={
        {
          '--color': color,
          '--border-color': adjustColorShade(color, -20),
        } as CSSProperties
      }
    >
      <ImageRender data={icon} />
      <span className="category-navigation_title">
        <TextRender data={title} /> {required ? <span className="category-navigation_required">*</span> : ''}
      </span>
    </div>
  );
};

export default CategoryNavigation;
