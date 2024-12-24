import { CSSProperties } from 'react';

import { StudioCategory } from '../../../../Studio/types/category';
import { adjustColorShade } from '../../../../Studio/utils/ui';
import SvgInset from '../../../../../components/SvgInset';
import './CategoryNavigation.scss';

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
