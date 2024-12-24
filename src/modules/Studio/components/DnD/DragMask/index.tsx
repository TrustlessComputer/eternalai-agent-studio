import { DragOverlay } from '@dnd-kit/core';
import { memo } from 'react';
import useDragMaskStore from 'modules/Studio/stores/useDragMaskStore';

import Lego from '../../Lego';

const DragMask = () => {
  const draggingNode = useDragMaskStore((state) => state.draggingNode);

  if (!draggingNode) return null;

  return (
    <DragOverlay>
      <Lego>{draggingNode.data.title}</Lego>
    </DragOverlay>
  );
};

export default memo(DragMask);
