import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { StudioCategory, StudioCategoryOption, StudioCategoryTypeEnum } from '@/modules/Studio/types/category';
import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import { StudioNode } from '@/modules/Studio/types/graph';
import { cloneData, getFormDataFromCategoryOption } from '@/modules/Studio/utils/data';
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

  const getNewNode = (keyMapper: string, option: StudioCategoryOption, existedId?: string) => {
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

    const newNode = createNewBaseNode(id, position, {
      children: [],
      keyMapper,
    });

    if (!existedId) {
      const defaultValues = getFormDataFromCategoryOption(option || {});
      useStudioFormStore.getState().addForm(newNode.id, {
        ...defaultValues,
      });
    }

    return newNode;
  };

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    movingNodeRef.current = null;
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const dataForms = useStudioFormStore.getState().dataForms;
    const { active, over } = event;

    const fromData = active?.data?.current as DraggableDataType;
    const from = fromData?.type;
    const fromCategory = useStudioCategoryStore.getState().mapCategories[fromData?.categoryKey || ''] as StudioCategory;
    const fromOption = useStudioCategoryStore.getState().mapCategories[
      fromData?.optionKey || ''
    ] as StudioCategoryOption;
    const fromNode = useStudioFlowStore.getState().nodes.find((node) => node.id === fromData?.belongsTo);

    const toData = over?.data?.current as DraggableDataType;
    const to = toData?.type;
    const toCategory = useStudioCategoryStore.getState().mapCategories[toData?.categoryKey || ''] as StudioCategory;
    const toOption = useStudioCategoryStore.getState().mapCategories[toData?.optionKey || ''] as StudioCategoryOption;
    const toNode = useStudioFlowStore.getState().nodes.find((node) => node.id === toData?.belongsTo);

    const isTheSameNode = fromNode?.id === toNode?.id;
    const currentFormData = fromData?.belongsTo ? dataForms[fromData?.belongsTo] : {};
    const allFormData = dataForms;

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
      // Create WHEN it's Standalone && from Source
      if (
        from === DndType.SOURCE &&
        (fromOption.type === StudioCategoryTypeEnum.STANDALONE || fromCategory.isRoot) &&
        fromData?.optionKey
      ) {
        const isValid = fromOption?.onDroppedInValidate?.(fromOption, allFormData) ?? true;
        if (isValid) {
          const newNode = getNewNode(fromData.optionKey, fromOption);

          useStudioFlowStore.getState().addNode(newNode);

          console.log('[DndContainer] handleDragEnd case: Dropped on distribution from source', {
            newNode,
          });
        }
      }

      // Decouple
      // if (from === DndType.PRODUCT_ADDON && !isTheSameNode && fromNode && fromData?.belongsTo && fromData?.optionKey) {
      //   const childData = !isNil(fromData.childIndex)
      //     ? fromNode.data.metadata.children[fromData.childIndex as number]
      //     : null;

      //   const newNode = getNewNode(fromData.optionKey, fromOption, childData?.id);
      //   newNode.data.metadata.children = cloneData(fromNode.data.metadata.children)
      //     .filter((_, index) => index > (fromData?.childIndex || 0))
      //     .map((child) => getNewNode(child.data.metadata.keyMapper, fromOption, child.id));

      //   fromNode.data.metadata.children = fromNode.data.metadata.children.filter(
      //     (_, index) => index < (fromData?.childIndex || 0),
      //   );

      //   useStudioFlowStore.getState().addNode(newNode);
      //   useStudioFlowStore.getState().updateNode(fromNode);
      // }
    }

    if (to === DndType.PACKAGE && toNode) {
      // Snap
      // if (from === DndType.PRODUCT && !isTheSameNode) {
      //   console.log('[DndContainer] handleDragEnd case: Dropped on package from product', {
      //     fromData,
      //     toData,
      //   });

      //   const fromNode = useStudioFlowStore.getState().nodes.find((node) => node.id === fromData?.belongsTo);
      //   if (!fromNode) return;

      //   toNode.data.metadata.children = [
      //     ...toNode.data.metadata.children,
      //     fromNode,
      //     ...cloneData(fromNode.data.metadata.children),
      //   ];

      //   fromNode.data.metadata.children = [];

      //   useStudioFlowStore.getState().updateNode(toNode);
      //   useStudioFlowStore.getState().removeNode(fromNode.id);
      // }

      // Create WHEN it's Inline && from Source
      if (from === DndType.SOURCE && fromOption.type === StudioCategoryTypeEnum.INLINE && fromData?.optionKey) {
        const isValid = fromOption?.onSnapValidate?.(fromOption, toOption, currentFormData, allFormData) ?? true;
        if (isValid) {
          console.log('[DndContainer] handleDragEnd case: Dropped on package from source', {
            fromData,
            toData,
          });

          const newNode = getNewNode(fromData.optionKey, fromOption);

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
        }
      }

      // Move current package to target package
      if (
        from === DndType.PRODUCT_ADDON &&
        !isTheSameNode &&
        fromNode &&
        fromOption.type === StudioCategoryTypeEnum.INLINE &&
        fromData?.belongsTo &&
        fromData?.optionKey
      ) {
        const isValid = fromOption?.onSnapValidate?.(fromOption, toOption, currentFormData, allFormData) ?? true;
        if (isValid) {
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
    }

    if (to === DndType.FACTORY && !fromCategory.isRoot) {
      // Remove
      if (from === DndType.PRODUCT && fromData?.belongsTo) {
        console.log('[DndContainer] handleDragEnd case: Dropped on factory from product', {
          fromData,
          toData,
        });

        const isValid = fromOption?.onDroppedOutValidate?.(fromOption, currentFormData, allFormData) ?? true;
        if (isValid) {
          useStudioFlowStore.getState().removeNode(fromData?.belongsTo);
        }
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

  const handleDragOver = useCallback((_event: DragOverEvent) => {}, []);

  const handleDragCancel = useCallback((_event: DragCancelEvent) => {}, []);

  const handleDragAbort = useCallback((_event: DragAbortEvent) => {}, []);

  const handleDragPending = useCallback((_event: DragPendingEvent) => {}, []);

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
