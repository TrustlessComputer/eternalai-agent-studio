import { memo, useMemo } from 'react';

import { INPUT_DROP_ID } from '../../constants/droppable-id';
import useStudioCategoryStore from '../../stores/useStudioCategoryStore';
import Droppable from '../DnD/Droppable';
import CategoryGroup from './CategoryGroup';
import CategoryNavigation from './CategoryNavigation';
import './Sidebar.scss';

const Sidebar = () => {
  const categories = useStudioCategoryStore((state) => state.categories);
  const filters = useStudioCategoryStore((state) => state.filters);

  const renderCategories = useMemo(() => {
    if (!filters.length) {
      return categories;
    }

    return categories.filter((item) => filters.includes(item.keyMapper));
  }, [categories, filters]);

  return (
    <Droppable id={INPUT_DROP_ID} data={{}} className="sidebar">
      <div className="sidebar_left">
        <div className="sidebar_left_inner">
          {categories.map((category) => (
            <CategoryNavigation {...category} />
          ))}
        </div>
      </div>

      <div className="sidebar_right">
        <div className="sidebar_right_inner">
          {renderCategories.map((category) => (
            <CategoryGroup {...category} />
          ))}
        </div>
      </div>
    </Droppable>
  );
};

export default memo(Sidebar);
