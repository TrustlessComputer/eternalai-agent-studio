import Draggable from '../../DnD/Draggable';
import Lego from '../../Lego';
import LegoContent from '../../LegoContent';

import { StudioCategory } from '@/modules/Studio/types/category';
import './CategoryGroup.scss';

type Props = StudioCategory;

const CategoryGroup = ({ title, color, options }: Props) => {
  return (
    <div className="category-group">
      <h5 className="category-group_title">{title}</h5>
      <div className="category-group_options">
        {options.map((option) => (
          <Draggable id={option.id} data={{}} key={option.id}>
            <Lego background={color}>
              <LegoContent>
                <p>{option.title}</p>
              </LegoContent>
            </Lego>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
