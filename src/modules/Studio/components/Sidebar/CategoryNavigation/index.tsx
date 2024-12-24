import { CSSProperties } from 'react';

import ImageRender from '../../Render/ImageRender';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';
import { adjustColorShade } from '@/modules/Studio/utils/ui';

import './CategoryNavigation.scss';

type Props = StudioCategory;

const CategoryNavigation = ({ icon, title, color, hidden, required }: Props) => {
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
      <ImageRender data={icon} />
      <span className="category-navigation_title">
        <TextRender data={title} /> {required ? <span className="category-navigation_required">*</span> : ''}
      </span>
    </div>
  );
};

export default CategoryNavigation;
