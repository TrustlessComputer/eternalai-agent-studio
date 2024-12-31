import { memo, useMemo } from 'react';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';

import Factory from '../DnD/Factory';
import CategoryGroup from './CategoryGroup';
import CategoryNavigation from './CategoryNavigation';
import './Sidebar.scss';
import SidebarOverlay from './SidebarOverlay';

const Sidebar = () => {
  const categories = useStudioCategoryStore((state) => state.categories);
  const filters = useStudioCategoryStore((state) => state.filters);

  // check data have contains isRoot or not
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
    <Factory className="sidebar">
      <div className="sidebar__left">
        <div className="sidebar__left__inner">
          {renderNavigationCategories.map((category) => (
            <CategoryNavigation {...category} key={`sidebar-navigation-${category.keyMapper}`} />
          ))}
        </div>
      </div>

      <div className="sidebar__right">
        <SidebarOverlay />

        <div className="sidebar__right__inner">
          {renderGroupCategories.map((category) => (
            <CategoryGroup {...category} categoryKey={category.keyMapper} key={`sidebar-group-${category.keyMapper}`} />
          ))}
        </div>
      </div>
    </Factory>
  );
};

export default memo(Sidebar);
