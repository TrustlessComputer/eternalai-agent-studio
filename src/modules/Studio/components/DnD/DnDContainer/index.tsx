import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import { StudioNode } from '@/modules/Studio/types/graph';
import { cloneData, getFormDataFromCategory } from '@/modules/Studio/utils/data';
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

  const getNewNode = (keyMapper: string, existedId?: string) => {
    const {
      transform: [transformX, transformY, zoomLevel],
    } = flowStore.getState();
    const mousePosition = useStudioFlowViewStore.getState().mousePosition;
    const transformedX = (mousePosition.x - transformX) / zoomLevel;
    const transformedY = (mousePosition.y - transformY) / zoomLevel;

    const id = existedId || v4();
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
        const newNode = getNewNode(fromData.optionId);

        useStudioFlowStore.getState().addNode(newNode);

        const defaultValues = getFormDataFromCategory(fromOption || {});
        useStudioFormStore.getState().addForm(newNode.id, {
          ...defaultValues,
        });
        console.log('[DndContainer] handleDragEnd case: Dropped on distribution from source', {
          newNode,
        });
      }

      // Check if draggable node is child of another node => decouple that to standalone node
      if (
        from === DndType.PRODUCT_ADDON &&
        fromData?.belongsTo &&
        fromData?.optionId &&
        fromData?.belongsTo !== toData?.belongsTo
      ) {
        const fromNode = useStudioFlowStore.getState().nodes.find((node) => node.id === fromData?.belongsTo);
        if (!fromNode) return;

        const newNode = getNewNode(fromData.optionId);
        newNode.data.metadata.children = cloneData(fromNode.data.metadata.children)
          .filter((_, index) => index > (fromData?.childIndex || 0))
          .map((child) => getNewNode(child.data.metadata.keyMapper));

        fromNode.data.metadata.children = fromNode.data.metadata.children.filter(
          (_, index) => index < (fromData?.childIndex || 0),
        );

        useStudioFlowStore.getState().addNode(newNode);
        useStudioFlowStore.getState().updateNode(fromNode);
      }
    }

    if (to === DndType.PACKAGE) {
      const toNode = useStudioFlowStore.getState().nodes.find((node) => node.id === toData?.belongsTo);
      if (!toNode) return;

      // Accept snap item
      // Create new, dragged from node
      if (from === DndType.PRODUCT) {
        console.log('[DndContainer] handleDragEnd case: Dropped on package from product', {
          fromData,
          toData,
        });

        const fromNode = useStudioFlowStore.getState().nodes.find((node) => node.id === fromData?.belongsTo);
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
      }

      if (from === DndType.SOURCE && fromData?.optionId) {
        console.log('[DndContainer] handleDragEnd case: Dropped on package from source', {
          fromData,
          toData,
        });

        // Create new, dragged from sidebar
        const newNode = getNewNode(fromData.optionId);

        toNode.data.metadata.children = [...toNode.data.metadata.children, newNode];

        const updatedNodes = applyNodeChanges(
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
        useStudioFlowStore.getState().updateNode(updatedNodes[0]);

        const defaultValues = getFormDataFromCategory(fromOption || {});
        useStudioFormStore.getState().addForm(newNode.id, {
          ...defaultValues,
        });
      }

      if (
        from === DndType.PRODUCT_ADDON &&
        fromData?.belongsTo &&
        fromData?.optionId &&
        fromData?.belongsTo !== toData?.belongsTo
      ) {
        const fromNode = useStudioFlowStore.getState().nodes.find((node) => node.id === fromData?.belongsTo);
        if (!fromNode) return;

        const addons = cloneData(fromNode.data.metadata.children).filter(
          (_, index) => index >= (fromData?.childIndex || 0),
        );

        toNode.data.metadata.children = [...toNode.data.metadata.children, ...addons];

        fromNode.data.metadata.children = fromNode.data.metadata.children.filter(
          (_, index) => index < (fromData?.childIndex || 0),
        );

        const updatedNodes = applyNodeChanges(
          [
            { id: toNode.id, type: 'position', position: toNode.position, positionAbsolute: toNode.position },
            { id: fromNode.id, type: 'position', position: fromNode.position, positionAbsolute: fromNode.position },
          ],
          [toNode, fromNode],
        );

        useStudioFlowStore.getState().updateNode(updatedNodes[0]);
        useStudioFlowStore.getState().updateNode(updatedNodes[1]);
      }
    }

    if (to === DndType.FACTORY) {
      // Accept exist node - from board
      // Remove node from board
      if (from === DndType.PRODUCT && fromData?.belongsTo) {
        console.log('[DndContainer] handleDragEnd case: Dropped on factory from product', {
          fromData,
          toData,
        });

        useStudioFlowStore.getState().removeNode(fromData?.belongsTo);
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
