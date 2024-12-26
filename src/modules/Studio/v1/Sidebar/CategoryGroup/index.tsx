import { StudioCategory } from '@/modules/Studio/types/category';

import Draggable from '@/modules/Studio/components/DnD/Draggable';
import Lego from '@/modules/Studio/components/Lego';
import LegoContent from '@/modules/Studio/components/LegoContent';
import TextRender from '@/modules/Studio/components/Render/TextRender';
import { mergeIds } from '@/utils/flow';
import { useMemo } from 'react';
import './CategoryGroup.scss';

type Props = StudioCategory;

const CategoryGroup = (category: Props) => {
  const { key, title, color, options, customizeRenderOnSideBar, required } = useMemo(() => category, [category]);

  if (customizeRenderOnSideBar && typeof customizeRenderOnSideBar === 'function') {
    return customizeRenderOnSideBar({});
  }

  return (
    <div className="category-group">
      <h5 className="category-group__title">
        <TextRender data={title} /> {required ? <span className="category-navigation__required">*</span> : ''}
      </h5>
      <div className="category-group__options">
        {options.map((option) => (
          <Draggable
            id={mergeIds([key, option.key])}
            data={{ isRight: false, category, option, data: option.data }}
            key={mergeIds([key, option.key])}
          >
            <Lego background={color} icon={option.icon}>
              <LegoContent>
                <TextRender data={option.title} />
              </LegoContent>
            </Lego>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
