import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';

import { useMemo } from 'react';
import Source from '../../DnD/Source';
import './CategoryGroup.scss';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';

type Props = StudioCategory & {
  categoryKey: string;
};

const CategoryGroup = ({
  categoryKey,
  title,
  color,
  options,

  required,
  disabled,
  isRoot,
  multipleOption,
}: Props) => {
  const usedKeyCollection = useStudioCategoryStore((state) => state.usedKeyCollection);
  const filteredOptions = useMemo(() => {
    return options.filter((item) => !item.hidden);
  }, [options]);

  return (
    <div className="category-group">
      <h5 className="category-group__title">
        <TextRender data={title} /> {required ? <span className="category-navigation__required">*</span> : ''}
      </h5>

      <div className="category-group__options">
        {filteredOptions.map((option) => {
          if (option.customizeRenderOnSideBar && typeof option.customizeRenderOnSideBar === 'function') {
            return option.customizeRenderOnSideBar();
          }

          let isDisabled = disabled || option.disabled;
          // check parent first
          // if (!isDisabled) {
          //   if (!multipleOption) {
          //     if (usedKeyCollection[categoryKey]) {
          //       isDisabled = true;
          //     }
          //   }
          // }

          // if (!isDisabled) {
          //   if (!option.multipleChoice) {
          //     if (usedKeyCollection[option.key]) {
          //       isDisabled = true;
          //     }
          //   }
          // }

          return (
            <Source
              id={option.key}
              key={`sidebar-source-${categoryKey}-${option.key}`}
              data={{ categoryKey, optionKey: option.key, isRoot }}
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
