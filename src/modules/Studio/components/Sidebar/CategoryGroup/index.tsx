import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';

import './CategoryGroup.scss';

type Props = StudioCategory;

const CategoryGroup = ({ title, color, options, customizeRenderOnSideBar, required }: Props) => {
  if (customizeRenderOnSideBar && typeof customizeRenderOnSideBar === 'function') {
    return customizeRenderOnSideBar({});
  }

  return (
    <div className="category-group">
      <h5 className="category-group_title">
        <TextRender data={title} /> {required ? <span className="category-navigation_required">*</span> : ''}
      </h5>
      <div className="category-group_options">
        {options.map((option) => (
          <Draggable id={option.key} data={{ isRight: false, option, data: option.data }} key={option.key}>
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
