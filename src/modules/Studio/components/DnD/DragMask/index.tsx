import { DragOverlay } from '@dnd-kit/core';
import { memo } from 'react';

import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';

const DragMask = () => {
  const draggingCategoryItem = useDragMaskStore((state) => state.draggingCategoryItem);

  if (!draggingCategoryItem) return null;

  return <DragOverlay>{draggingCategoryItem}</DragOverlay>;
};

export default memo(DragMask);
