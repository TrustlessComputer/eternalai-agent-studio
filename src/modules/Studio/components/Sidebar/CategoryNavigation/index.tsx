import { CSSProperties } from 'react';

import { LegoComponentIcon } from '../../icons/lego';

import { StudioCategory } from '@/modules/Studio/types/category';
import { adjustColorShade } from '@/modules/Studio/utils/ui';
import './CategoryNavigation.scss';

type Props = StudioCategory;

const CategoryNavigation = ({ id, title, color, hidden, required }: Props) => {
  if (hidden) return null;

  return (
    <div
      onClick={() => {
        //
      }}
      className="category-navigation"
      style={
        {
          '--color': color,
          '--border-color': adjustColorShade(color, -20),
        } as CSSProperties
      }
    >
      <LegoComponentIcon />
      <span className="category-navigation_title">
        {title} {required ? <span className="category-navigation_required">*</span> : ''}
      </span>
    </div>
  );
};

export default CategoryNavigation;
