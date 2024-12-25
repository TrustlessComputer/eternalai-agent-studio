import { DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useStoreApi } from '@xyflow/react';
import { v4 } from 'uuid';

import { useCallback } from 'react';
import { INPUT_DROP_ID, OUTPUT_DROP_ID } from '../constants/droppable-id';
import useStudioFlowStore from '../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../stores/useStudioFlowViewStore';
import { createNewBaseNode } from '../utils/node';

const useStudioDnD = () => {
  const addNode = useStudioFlowStore((state) => state.addNode);
  const removeNode = useStudioFlowStore((state) => state.removeNode);
  const reloadFlow = useStudioFlowStore((state) => state.reloadFlow);
  const flowStore = useStoreApi();

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = useCallback((event: DragStartEvent) => {}, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    const newNodes = useStudioFlowStore.getState().nodes;

    const isActiveFromRight = active.data.current?.isRight;
    const isActiveParent = active.data.current?.isParent;
    const activeBelongsTo = active.data.current?.belongsTo;
    const activeNode = newNodes.find((node) => node.id === activeBelongsTo);

    const droppedOnInput = over.id === INPUT_DROP_ID;
    const droppedOnOutput = over.id === OUTPUT_DROP_ID;

    if (!activeNode) return;

    if (droppedOnInput && isActiveFromRight) {
      const isEmptyChildren = activeNode.data.metadata.children.length === 0;

      if (isEmptyChildren) {
        removeNode(activeNode.id);
      } else if (isActiveParent) {
      } else {
        // const newChildren = removeItemFromArray(activeNode.data.metadata.children, active.data.current?.);
      }

      reloadFlow();

      return;
    }

    if (droppedOnOutput && !isActiveFromRight) {
      const {
        transform: [transformX, transformY, zoomLevel],
      } = flowStore.getState();
      const mousePosition = useStudioFlowViewStore.getState().mousePosition;
      const transformedX = (mousePosition.x - transformX) / zoomLevel;
      const transformedY = (mousePosition.y - transformY) / zoomLevel;
      const nodeId = v4();

      const thisCategory = active.data.current?.category;
      const thisOption = active.data.current?.option;

      addNode(
        createNewBaseNode(
          nodeId,
          { x: transformedX, y: transformedY },
          {
            ...active,
            nodeId,
            category: thisCategory,
            option: thisOption,
            children: [],
          },
        ),
      );

      reloadFlow();

      return;
    }
  }, []);

  return { sensors, handleDragStart, handleDragEnd };
};

export default useStudioDnD;
