import { DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { v4 } from 'uuid';

import { INPUT_DROP_ID, OUTPUT_DROP_ID } from '../constants/droppable-id';
import useStudioFlowStore from '../stores/useStudioFlowStore';

import { NodeType } from '@/enums/node-type';
import { useStoreApi } from '@xyflow/react';
import { AREA_CLASS_NAME } from '../constants/area-class-name';
import useStudioBoardMouse from '../stores/useStudioBoardMouse';

const useStudioDnD = () => {
  const addNode = useStudioFlowStore((state) => state.addNode);
  const removeNode = useStudioFlowStore((state) => state.removeNode);

  const flowStore = useStoreApi();

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = (event: DragStartEvent) => { };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('[useStudioDnd] drag end', event);

    const { active, over } = event;

    if (!active || !over) return;

    const isDroppedOnInput = over.id === INPUT_DROP_ID;
    const isDroppedOnOutput = over.id === OUTPUT_DROP_ID;

    if (isDroppedOnInput) {
      //
    }

    if (isDroppedOnOutput) {
      const { transform: [transformX, transformY, zoomLevel] } = flowStore.getState();
      const mousePosition = useStudioBoardMouse.getState().mousePosition;
      const transformedX = (mousePosition.x - transformX) / zoomLevel;
      const transformedY = (mousePosition.y - transformY) / zoomLevel;
      const nodeId = v4();

      addNode({
        id: nodeId,
        type: active.data.current?.nodeType || NodeType.Piece,
        position: { x: transformedX, y: transformedY },
        data: {
          sourceHandles: [],
          targetHandles: [],
          metadata: { ...active, nodeId },
        },
        dragHandle: AREA_CLASS_NAME.dragHandle,
        deletable: false,
      });
    }
  };

  return { sensors, handleDragStart, handleDragEnd };
};

export default useStudioDnD;
