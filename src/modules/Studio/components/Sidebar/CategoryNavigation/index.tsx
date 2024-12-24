import { CSSProperties } from 'react';
import SvgInset from 'src/components/SvgInset';
import { StudioCategory } from 'src/modules/Studio/types/category';
import { adjustColorShade } from 'src/modules/Studio/utils/ui';
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
      <SvgInset src={`/svgs/lego-component.svg`} />
      <span className="category-navigation_title">{title}</span>
    </a>
  );
};

export default CategoryNavigation;
