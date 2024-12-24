import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import { DragOverlay } from '@dnd-kit/core';
import { memo } from 'react';

const DragMask = () => {
  const draggingCategoryItem = useDragMaskStore((state) => state.draggingCategoryItem);

  if (!draggingCategoryItem) return null;

  return <DragOverlay>{draggingCategoryItem}</DragOverlay>;
};

export default memo(DragMask);
