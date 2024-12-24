import { StudioCategory } from '@/modules/Studio/types/category';
import { adjustColorShade } from '@/modules/Studio/utils/ui';
import { CSSProperties } from 'react';
import { LegoComponentIcon } from '../../icons/lego';
import './CategoryNavigation.scss';

type Props = StudioCategory;

const CategoryNavigation = ({ id, title, color, hidden, required }: Props) => {
  if (hidden) return null;

  return (
    <a
      href={`#${id}`}
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
    </a>
  );
};

export default CategoryNavigation;
