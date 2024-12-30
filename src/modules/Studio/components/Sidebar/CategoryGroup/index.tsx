import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';

import { useMemo } from 'react';
import Source from '../../DnD/Source';
import './CategoryGroup.scss';

type Props = StudioCategory & {
  categoryKey: string;
};

const CategoryGroup = ({
  categoryKey,
  title,
  color,
  options,
  customizeRenderOnSideBar,
  required,
  disabled,
  isRoot,
}: Props) => {
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
        {filteredOptions.map((option) => {
          const isDisabled = disabled || option.disabled;

          return (
            <Source
              id={option.keyMapper}
              key={option.keyMapper}
              data={{ categoryKey, optionKey: option.keyMapper, isRoot }}
              disabled={isDisabled}
            >
              <Lego background={color} icon={option.icon} disabled={isDisabled}>
                <LegoContent>
                  <TextRender data={option.title} />
                </LegoContent>
              </Lego>
            </Source>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGroup;
