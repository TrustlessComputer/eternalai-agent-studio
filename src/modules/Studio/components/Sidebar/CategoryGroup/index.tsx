import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';

import { mergeIds } from '@/utils/flow';
import { useMemo } from 'react';
import './CategoryGroup.scss';

type Props = StudioCategory;

const CategoryGroup = (category: Props) => {
  const { key, title, color, options, customizeRenderOnSideBar } = useMemo(() => category, [category]);

  if (customizeRenderOnSideBar && typeof customizeRenderOnSideBar === 'function') {
    return customizeRenderOnSideBar({});
  }

  return (
    <div className="category-group">
      <h5 className="category-group_title">
        <TextRender data={title} />
      </h5>
      <div className="category-group_options">
        {options.map((option) => (
          <Draggable
            id={mergeIds([key, option.key])}
            data={{ isRight: false, category, option, data: option.data }}
            key={mergeIds([key, option.key])}
          >
            <Lego background={color}>
              <LegoContent>
                <p>
                  <TextRender data={option.title} />
                </p>
              </LegoContent>
            </Lego>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
