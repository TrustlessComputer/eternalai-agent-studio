import { DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useStoreApi } from '@xyflow/react';
import { v4 } from 'uuid';

import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { useCallback } from 'react';
import { INPUT_DROP_ID, OUTPUT_DROP_ID } from '../../constants/droppable-id';
import { NodeType } from '../../enums/node-type';
import { removeItemFromArray } from '../../utils/array';
import { cloneData, getFormDataFromCategory } from '../../utils/data';
import { createNewBaseNode } from '../../utils/node';

const useStudioDnD = () => {
  const addNode = useStudioFlowStore((state) => state.addNode);
  const removeNode = useStudioFlowStore((state) => state.removeNode);
  const setNodes = useStudioFlowStore((state) => state.setNodes);
  const reloadFlow = useStudioFlowStore((state) => state.reloadFlow);
  const flowStore = useStoreApi();

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = useCallback((_event: DragStartEvent) => {}, []);

  // TODO: Process data after reload
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active: lego, over } = event;

    if (!lego || !over) return;

    const newNodes = cloneData(useStudioFlowStore.getState().nodes);

    const isLegoFromRight = lego.data.current?.isRight;
    const isLegoParent = lego.data.current?.isParent;
    const legoBelongsTo = lego.data.current?.belongsTo;
    const thisNode = newNodes.find((node) => node.id === legoBelongsTo);

    const droppedOnInput = over.id === INPUT_DROP_ID;
    const droppedOnOutput = over.id === OUTPUT_DROP_ID;

    const {
      transform: [transformX, transformY, zoomLevel],
    } = flowStore.getState();
    const mousePosition = useStudioFlowViewStore.getState().mousePosition;
    const transformedX = (mousePosition.x - transformX) / zoomLevel;
    const transformedY = (mousePosition.y - transformY) / zoomLevel;

    if (thisNode?.data.type !== NodeType.BASE) {
      return;
    }

    // From output to input
    if (droppedOnInput && isLegoFromRight && thisNode) {
      const isEmptyChildren = thisNode.data.metadata.children.length === 0;

      // Remove the node if it has no children
      if (isLegoParent && isEmptyChildren) {
        removeNode(thisNode.id);
      }
      // Remove the child
      else {
        const newChildren = removeItemFromArray(thisNode.data.metadata.children, lego.data.current?.metadata);
        thisNode.data.metadata.children = newChildren;

        setNodes(newNodes);
      }

      reloadFlow();

      return;
    }

    // Drag out the node
    if (isLegoFromRight && droppedOnOutput && !isLegoParent && thisNode) {
      const newChildren = removeItemFromArray(thisNode.data.metadata.children, lego.data.current?.metadata);
      thisNode.data.metadata.children = newChildren;

      const prevNode = lego.data.current?.metadata;
      prevNode.children = [];
      prevNode.position = { x: transformedX, y: transformedY };

      newNodes.push(prevNode);

      setNodes(newNodes);
      reloadFlow();

      return;
    }

    // From input to output
    if (droppedOnOutput && !isLegoFromRight) {
      const nodeId = v4();

      const thisCategory = lego.data.current?.category;
      const thisOption = lego.data.current?.option;

      addNode(
        createNewBaseNode(
          nodeId,
          { x: transformedX, y: transformedY },
          {
            ...lego,
            nodeId,
            category: thisCategory,
            option: thisOption,
            children: [],
          },
        ),
      );

      // add form data for node
      const defaultValues = getFormDataFromCategory(thisOption || {});
      useStudioFormStore.getState().addForm(nodeId, {
        ...defaultValues,
      });

      reloadFlow();

      return;
    }
  }, []);

  return { sensors, handleDragStart, handleDragEnd };
};

export default useStudioDnD;
