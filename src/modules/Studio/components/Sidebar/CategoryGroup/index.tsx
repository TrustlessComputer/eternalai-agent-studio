import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';

import { useMemo } from 'react';
import Source from '../../DnD/Source';
import './CategoryGroup.scss';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';

type Props = StudioCategory;

const CategoryGroup = (props: Props) => {
  const { idx, title, color, options, required, disabled, isRoot, multipleOption, customizeRenderOnSidebar } = props;

  const usedKeyCollection = useStudioCategoryStore((state) => state.usedKeyCollection);
  const filteredOptions = useMemo(() => {
    return options.filter((item) => !item.hidden);
  }, [options]);

  if (customizeRenderOnSidebar && typeof customizeRenderOnSidebar === 'function') {
    return customizeRenderOnSidebar(props);
  }

  return (
    <div className="category-group">
      <h5 className="category-group__title">
        <TextRender data={title} /> {required ? <span className="category-navigation__required">*</span> : ''}
      </h5>

      <div className="category-group__options">
        {filteredOptions.map((option) => {
          if (option.customizeRenderOnSideBar && typeof option.customizeRenderOnSideBar === 'function') {
            return option.customizeRenderOnSideBar(option);
          }

          let isDisabled = disabled || option.disabled;
          // check parent first
          if (!isDisabled) {
            if (!multipleOption) {
              if (usedKeyCollection[idx]) {
                isDisabled = true;
              }
            }
          }

          if (!isDisabled) {
            if (!option.multipleChoice) {
              if (usedKeyCollection[option.idx]) {
                isDisabled = true;
              }
            }
          }

          return (
            <Source
              id={option.idx}
              key={`sidebar-source-${idx}-${option.idx}`}
              data={{ categoryKey: idx, optionKey: option.idx, isRoot }}
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
