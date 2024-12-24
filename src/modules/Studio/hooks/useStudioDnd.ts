import { DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { v4 } from 'uuid';

import { INPUT_DROP_ID, OUTPUT_DROP_ID } from '../constants/droppable-id';
import useStudioFlowStore from '../stores/useStudioFlowStore';

import { NodeType } from '@/enums/node-type';
import { AREA_CLASS_NAME } from '../constants/area-class-name';

const useStudioDnD = () => {
  const addNode = useStudioFlowStore((state) => state.addNode);
  const removeNode = useStudioFlowStore((state) => state.removeNode);

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
      addNode({
        id: v4(),
        type: active.data.current?.nodeType || NodeType.Piece,
        position: { x: 0, y: 0 },
        data: {
          title: active.data.current?.title || 'Output',
          sourceHandles: [],
          targetHandles: [],
          metadata: active,
        },
        dragHandle: AREA_CLASS_NAME.dragHandle,
        deletable: false,
      });
    }
  };

  return { sensors, handleDragStart, handleDragEnd };
};

export default useStudioDnD;
