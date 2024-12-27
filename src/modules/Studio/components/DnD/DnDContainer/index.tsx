import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import { StudioNode } from '@/modules/Studio/types/graph';
import { cloneData } from '@/modules/Studio/utils/data';
import { createNewBaseNode } from '@/modules/Studio/utils/node';
import {
  DndContext,
  DragAbortEvent,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragPendingEvent,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { applyNodeChanges, useStoreApi } from '@xyflow/react';
import { useCallback, useRef } from 'react';
import { v4 } from 'uuid';

function DnDContainer({ children }: { children: React.ReactNode }) {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));
  const flowStore = useStoreApi();
  const movingNodeRef = useRef<StudioNode>(null);

  const getNewNode = (keyMapper: string) => {
    const {
      transform: [transformX, transformY, zoomLevel],
    } = flowStore.getState();
    const mousePosition = useStudioFlowViewStore.getState().mousePosition;
    const transformedX = (mousePosition.x - transformX) / zoomLevel;
    const transformedY = (mousePosition.y - transformY) / zoomLevel;

    const id = v4();
    const position = {
      x: transformedX,
      y: transformedY,
    };

    return createNewBaseNode(id, position, {
      children: [],
      keyMapper,
    });
  };

  const handleDragStart = useCallback((event: DragStartEvent) => {
    movingNodeRef.current = null;
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    const fromData = active?.data?.current as DraggableDataType;
    const from = fromData?.type;
    const fromCategory = useStudioCategoryStore.getState().mapCategories[fromData?.categoryId || ''];
    const fromOption = useStudioCategoryStore.getState().mapCategories[fromData?.optionId || ''];

    const toData = over?.data?.current as DraggableDataType;
    const to = toData?.type;
    const toCategory = useStudioCategoryStore.getState().mapCategories[toData?.categoryId || ''];
    const toOption = useStudioCategoryStore.getState().mapCategories[toData?.optionId || ''];

    console.log('[DndContainer] handleDragEnd', {
      from,
      to,
      //
      fromOption,
      toOption,
      //
      fromData,
      toData,
      //
      fromCategory,
      toCategory,
    });

    if (to === DndType.DISTRIBUTION) {
      // Accept new node - from sidebar
      // Create new, dragged from sidebar
      if (from === DndType.SOURCE && fromData?.optionId) {
        console.log('_______________handle new node');
        const newProduct = getNewNode(fromData.optionId);

        useStudioFlowStore.getState().addNode(newProduct);
      } else {
        // Check if draggable node is child of another node => decouple that to standalone node
      }
    } else if (to === DndType.PACKAGE) {
      const toNode = useStudioFlowStore.getState().nodes.find((node) => node.id === toData?.nodeId);

      if (!toNode) return;

      // Accept snap item
      // Create new, dragged from node
      if (from === DndType.PRODUCT) {
        const fromNode = useStudioFlowStore.getState().nodes.find((node) => node.id === fromData?.nodeId);
        if (!fromNode) return;
        if (fromNode.id === toNode.id) return;

        toNode.data.metadata.children = [
          ...toNode.data.metadata.children,
          fromNode,
          ...cloneData(fromNode.data.metadata.children),
        ];

        fromNode.data.metadata.children = [];

        useStudioFlowStore.getState().updateNode(toNode);
        useStudioFlowStore.getState().removeNode(fromNode.id);
      } else if (from === DndType.SOURCE && fromData?.optionId) {
        // Create new, dragged from sidebar
        console.log('_______________handle create new and snap then ');
        const newProduct = getNewNode(fromData.optionId);

        toNode.data.metadata.children = [...toNode.data.metadata.children, newProduct];

        const updatedNode = applyNodeChanges(
          [
            {
              id: toNode.id,
              type: 'position',
              position: toNode.position,
              positionAbsolute: toNode.position,
              dragging: true,
            },
          ],
          [toNode],
        );
        useStudioFlowStore.getState().updateNode(updatedNode[0]);
      }
    } else if (to === DndType.FACTORY) {
      // Accept exist node - from board
      // Remove node from board
      if (from === DndType.PRODUCT && fromData?.nodeId) {
        console.log('_______________handle remove exist ');
        useStudioFlowStore.getState().removeNode(fromData?.nodeId);
      }
    }

    useStudioFlowStore.getState().reloadFlow();

    movingNodeRef.current = null;
  }, []);

  const handleDragMove = useCallback((event: DragMoveEvent) => {
    const { active, delta } = event;

    if (active) {
      const id = active.id as string;
      let movingNode = movingNodeRef.current;

      if (!movingNode) {
        const nodes = useStudioFlowStore.getState().nodes;
        const movingNodeIndex = nodes.findIndex((node) => node.id === id);
        movingNode = movingNodeRef.current || nodes[movingNodeIndex];
        movingNodeRef.current = movingNode;
      }

      if (movingNode) {
        movingNodeRef.current = movingNode;
        const newPosition = {
          x: movingNode.position.x + delta.x,
          y: movingNode.position.y + delta.y,
        };

        const updatedNode = applyNodeChanges(
          [
            {
              id,
              type: 'position',
              position: newPosition,
              positionAbsolute: newPosition,
              dragging: true,
            },
          ],
          [movingNode],
        );

        useStudioFlowStore.getState().updateNode(updatedNode[0]);
      }
    }
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {}, []);

  const handleDragCancel = useCallback((event: DragCancelEvent) => {}, []);

  const handleDragAbort = useCallback((event: DragAbortEvent) => {}, []);

  const handleDragPending = useCallback((event: DragPendingEvent) => {}, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      onDragAbort={handleDragAbort}
      onDragPending={handleDragPending}
    >
      {children}
    </DndContext>
  );
}

export default DnDContainer;
