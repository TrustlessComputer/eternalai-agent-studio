import { DragOverlay } from '@dnd-kit/core';
import { memo } from 'react';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { useStoreApi } from '@xyflow/react';

const DragMask = () => {
  const { draggingElement, draggingData, draggingPosition, draggingPoint } = useStudioDndStore();
  const {
    transform: [transformX, transformY, zoomLevel],
  } = useStoreApi().getState();

  if (!draggingElement) return null;

  const processTransform = () => {
    if (!draggingData?.belongsTo) {
      return {
        scale: 1,
      };
    }

    const adjustedTransform = {
      x: (draggingPosition?.x ?? 0) / zoomLevel,
      y: (draggingPosition?.y ?? 0) / zoomLevel,
    };

    if (zoomLevel !== 1) {
      adjustedTransform.x -= (draggingPoint?.x ?? 0) / zoomLevel;
      adjustedTransform.y -= (draggingPoint?.y ?? 0) / zoomLevel;
    }

    return {
      scale: zoomLevel,
      transform: `translate(${adjustedTransform.x}px, ${adjustedTransform.y}px)`,
    };
  };

  return (
    <DragOverlay zIndex={10000} style={processTransform()}>
      {draggingElement}
    </DragOverlay>
  );
};

export default memo(DragMask);
