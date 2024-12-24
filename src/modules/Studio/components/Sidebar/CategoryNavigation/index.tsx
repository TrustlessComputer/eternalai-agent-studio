import { CSSProperties } from 'react';

import './CategoryNavigation.scss';
import { adjustColorShade } from '@/modules/Studio/utils/ui';
import { StudioCategory } from '@/modules/Studio/types/category';
import SvgInset from '@/components/SvgInset';

type Props = StudioCategory;

const CategoryNavigation = ({ id, title, color }: Props) => {
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
      <SvgInset src="/svgs/lego-component.svg" />
      <span className="category-navigation_title">{title}</span>
    </a>
  );
};

export default CategoryNavigation;
