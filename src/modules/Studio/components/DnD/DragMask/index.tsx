import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DragOverlay } from '@dnd-kit/core';
import { memo } from 'react';

const DragMask = () => {
  const draggingElement = useStudioDndStore((state) => state.draggingElement);

  if (!draggingElement) return null;

  return <DragOverlay zIndex={10000}>{draggingElement}</DragOverlay>;
};

export default memo(DragMask);
