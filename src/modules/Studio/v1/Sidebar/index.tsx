import { memo, useMemo } from 'react';

import Droppable from '@/modules/Studio/components/DnD/Droppable';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { INPUT_DROP_ID } from '../../constants/droppable-id';
import CategoryGroup from './CategoryGroup';
import CategoryNavigation from './CategoryNavigation';
import './Sidebar.scss';
import SidebarOverlay from './SidebarOverlay';

const Sidebar = () => {
  const categories = useStudioCategoryStore((state) => state.categories);
  const filters = useStudioCategoryStore((state) => state.filters);

  const renderNavigationCategories = useMemo(() => {
    return categories.filter((item) => !item.hidden);
  }, [categories]);

  const renderGroupCategories = useMemo(() => {
    if (!filters.length) {
      return renderNavigationCategories;
    }

    return renderNavigationCategories.filter((item) => filters.includes(item.keyMapper));
  }, [renderNavigationCategories, filters]);

  return (
    <Droppable id={INPUT_DROP_ID} data={{}} className="sidebar">
      <div className="sidebar__left">
        <div className="sidebar__left__inner">
          {renderNavigationCategories.map((category) => (
            <CategoryNavigation {...category} />
          ))}
        </div>
      </div>

      <div className="sidebar__right">
        <SidebarOverlay />

        <div className="sidebar__right__inner">
          {renderGroupCategories.map((category) => (
            <CategoryGroup {...category} />
          ))}
        </div>
      </div>
    </Droppable>
  );
};

export default memo(Sidebar);
