import cx from 'clsx';
import { memo, useMemo } from 'react';

import CategoryGroup from './CategoryGroup';
import CategoryNavigation from './CategoryNavigation';
import SidebarOverlay from './SidebarOverlay';
import { SidebarSide } from '../../enums/side';
import useStudioCategoryStore from '../../stores/useStudioCategoryStore';
import Factory from '../DnD/Factory';
import './Sidebar.scss';

type Props = {
  sidebarSide: SidebarSide;
};

const Sidebar = ({ sidebarSide }: Props) => {
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

    return renderNavigationCategories.filter((item) => filters.includes(item.idx));
  }, [renderNavigationCategories, filters]);

  return (
    <Factory className={cx('sidebar', sidebarSide === SidebarSide.LEFT ? 'sidebar--left' : 'sidebar--right')}>
      <div className="sidebar__left">
        <div className="sidebar__left__inner">
          {renderNavigationCategories.map((category) => (
            <CategoryNavigation {...category} key={`sidebar-navigation-${category.idx}`} />
          ))}
        </div>
      </div>

      <div className="sidebar__right">
        <SidebarOverlay />

        <div className="sidebar__right__inner">
          {renderGroupCategories.map((category) => (
            <CategoryGroup {...category} key={`sidebar-group-${category.idx}`} />
          ))}
        </div>
      </div>
    </Factory>
  );
};

export default memo(Sidebar);
