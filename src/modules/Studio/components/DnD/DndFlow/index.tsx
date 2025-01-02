import useDndAction from '@/modules/Studio/hooks/useDndAction';
import useDndInteraction from '@/modules/Studio/hooks/useDndInteraction';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { StudioCategory, StudioCategoryMap, StudioCategoryOption } from '@/modules/Studio/types/category';
import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import { StudioNode } from '@/modules/Studio/types/graph';
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
import { applyNodeChanges, XYPosition } from '@xyflow/react';
import { PropsWithChildren, useCallback, useRef } from 'react';

function DndFlow({ children }: PropsWithChildren) {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));

  const movingNodeRef = useRef<StudioNode>(null);

  const {
    addProduct,
    movePartOfPackage,
    removeProduct,
    removePartOfPackage,
    addToPackage,
    splitPackage,
    mergeProducts,
    getNewNodeInfo,
  } = useDndAction();
  const { updateNodes } = useDndInteraction();

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    movingNodeRef.current = null;
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    const data = useStudioDataStore.getState().data;
    const rootCategory = useStudioCategoryStore.getState().rootCategory;
    const rootOptionKey = rootCategory?.options?.map((item) => item?.keyMapper);

    const rootData = data.find(
      (item) => item.keyMapper === rootCategory?.keyMapper || rootOptionKey?.includes(item.keyMapper),
    );
    const rootNode = useStudioFlowStore.getState().nodes.find((node) => node.id === rootData?.id);

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

    const allFormData = useStudioFormStore.getState().dataForms;
    const currentFormData = fromData?.belongsTo ? allFormData[fromData.belongsTo] : null;

    const parentOption = (fromOption as StudioCategoryMap).parent;

    console.log('[DndContainer] handleDragEnd from to', {
      from,
      to,
    });

    console.log('[DndContainer] handleDragEnd option', {
      fromOption,
      toOption,
    });

    console.log('[DndContainer] handleDragEnd data', {
      fromData,
      toData,
    });

    console.log('[DndContainer] handleDragEnd category', {
      fromCategory,
      toCategory,
    });

    console.log('[DndContainer] handleDragEnd root', {
      rootCategory,
      rootNode,
      rootData,
      parentOption,
    });

    if (to === DndType.DISTRIBUTION) {
      // Create
      if (from === DndType.SOURCE) {
        const isValid =
          fromOption?.onDroppedInValidate?.({
            id: fromData.belongsTo,
            option: fromOption,
            parentOption,
            formData: currentFormData,
            allFormData,
            toNode,
            data,
          }) ?? true;

        if (!isValid) return;

        addProduct(rootNode, fromData, fromOption);
        updateNodes([rootNode]);
      }

      // Split
      if (from === DndType.PRODUCT_ADDON && !isTheSameNode && fromNode) {
        const isValid =
          fromOption.onSnapValidate?.({
            id: fromData.belongsTo,
            option: fromOption,
            parentOption,
            toOption,
            formData: currentFormData,
            allFormData,
            fromNode,
            toNode,
            data,
          }) ?? true;

        if (!isValid) return;

        splitPackage(rootNode, fromNode, fromData, fromOption);
        updateNodes([rootNode, fromNode]);
      }
    }

    if (to === DndType.PACKAGE && toNode) {
      // Add
      if (from === DndType.SOURCE) {
        const isValid =
          fromOption?.onDroppedInValidate?.({
            id: fromData.belongsTo,
            option: fromOption,
            parentOption,
            formData: currentFormData,
            allFormData,
            toNode,
            data,
          }) ?? true;

        if (!isValid) return;

        const newNode = getNewNodeInfo(fromData.optionKey, fromOption);

        addToPackage(toNode, [newNode]);
        updateNodes([toNode]);
      }

      // Merge
      if (from === DndType.PRODUCT && !isTheSameNode) {
        const isValid =
          fromOption.onSnapValidate?.({
            id: fromData.belongsTo,
            option: fromOption,
            parentOption,
            toOption,
            formData: currentFormData,
            allFormData,
            fromNode,
            toNode,
            data,
          }) ?? true;

        if (!isValid) return;

        mergeProducts(fromNode, toNode, fromData);
        updateNodes([fromNode, toNode]);
      }

      // Move
      if (from === DndType.PRODUCT_ADDON && !isTheSameNode && fromNode) {
        const isValid =
          fromOption.onSnapValidate?.({
            id: fromData.belongsTo,
            option: fromOption,
            parentOption,
            toOption,
            formData: currentFormData,
            allFormData,
            fromNode,
            toNode,
            data,
          }) ?? true;

        if (!isValid) return;

        movePartOfPackage(fromNode, toNode, fromData);
        updateNodes([fromNode, toNode]);
      }
    }

    if (to === DndType.FACTORY && !fromCategory?.isRoot) {
      // Remove the whole node
      if (from === DndType.PRODUCT) {
        const isValid =
          fromOption.onDroppedOutValidate?.({
            id: fromData.belongsTo,
            option: fromOption,
            parentOption,
            formData: currentFormData,
            allFormData,
            fromNode,
            data,
          }) ?? true;

        if (!isValid) return;

        removeProduct(fromData?.belongsTo);
      }

      // Remove the node's children
      if (from === DndType.PRODUCT_ADDON && !isTheSameNode && fromNode) {
        console.log('___________handle drag end', {
          to: DndType.FACTORY,
          from: DndType.PRODUCT_ADDON,
        });

        const isValid =
          fromOption.onDroppedOutValidate?.({
            id: fromData.belongsTo,
            option: fromOption,
            parentOption,
            formData: currentFormData,
            allFormData,
            fromNode,
            data,
          }) ?? true;

        if (!isValid) return;

        removePartOfPackage(fromNode, fromData?.childIndex || 0);
        updateNodes([fromNode]);
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

        const newPosition: XYPosition = {
          x: movingNode.position.x + delta.x,
          y: movingNode.position.y + delta.y,
        };

        updateNodes([movingNode]);

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

export default DndFlow;
