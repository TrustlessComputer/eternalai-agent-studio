import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';

import { useMemo } from 'react';
import Source from '../../DnD/Source';
import './CategoryGroup.scss';

type Props = StudioCategory;

const CategoryGroup = (category: Props) => {
  const { title, color, options, customizeRenderOnSideBar, required } = useMemo(() => category, [category]);

  const filteredOptions = useMemo(() => {
    return options.filter((item) => !item.hidden);
  }, [options]);

  if (customizeRenderOnSideBar && typeof customizeRenderOnSideBar === 'function') {
    return customizeRenderOnSideBar({});
  }

  return (
    <div className="category-group">
      <h5 className="category-group__title">
        <TextRender data={title} /> {required ? <span className="category-navigation_required">*</span> : ''}
      </h5>
      <div className="category-group__options">
        {filteredOptions.map((option) => (
          <Source id={option.key} key={option.key} data={{ optionId: option.key }}>
            <Lego background={color} icon={option.icon}>
              <LegoContent>
                <TextRender data={option.title} />
              </LegoContent>
            </Lego>
          </Source>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
