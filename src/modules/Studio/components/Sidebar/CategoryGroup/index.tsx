import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';
import TextRender from '../../Render/TextRender';

import { StudioCategory } from '@/modules/Studio/types/category';

import './CategoryGroup.scss';

type Props = StudioCategory;

const CategoryGroup = ({ title, color, options, customizeRenderOnSideBar }: Props) => {
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
          <Draggable id={option.keyMapper} data={{ isRight: false }} key={option.keyMapper}>
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
