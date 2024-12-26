import { memo, useMemo } from 'react';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import CategoryGroup from './CategoryGroup';
import CategoryNavigation from './CategoryNavigation';
import './FactoryNode.scss';

const FactoryNode = () => {
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
    <div className="factory-node nowheel">
      <div className="factory-node__left nowheel">
        <div className="factory-node__left__inner">
          {renderNavigationCategories.map((category) => (
            <CategoryNavigation {...category} />
          ))}
        </div>
      </div>

      <div className="factory-node__right nowheel">
        {/* <SidebarOverlay /> */}

        <div className="factory-node__right__inner">
          {renderGroupCategories.map((category) => (
            <CategoryGroup {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(FactoryNode);
