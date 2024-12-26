import { DragOverlay } from '@dnd-kit/core';
import { memo } from 'react';

import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';

const DragMask = () => {
  const draggingElement = useDragMaskStore((state) => state.draggingElement);

  if (!draggingElement) return null;

  return <DragOverlay zIndex={10000}>{draggingElement}</DragOverlay>;
};

export default memo(DragMask);
