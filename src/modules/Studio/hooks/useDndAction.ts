import { isNil } from '@/utils/data';
import { useStoreApi } from '@xyflow/react';
import { useCallback } from 'react';
import { v4 } from 'uuid';
import useStudioDndStore from '../stores/useStudioDndStore';
import useStudioFlowStore from '../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../stores/useStudioFlowViewStore';
import useStudioFormStore from '../stores/useStudioFormStore';
import { StudioCategoryOption } from '../types/category';
import { DraggableData } from '../types/dnd';
import { StudioNode } from '../types/graph';
import { cloneData, getFormDataFromCategoryOption } from '../utils/data';
import { createNewBaseEdge, getSourceHandle } from '../utils/edge';
import { createNewBaseNode } from '../utils/node';
import { noUndefinedElement } from '../utils/array';

const useDndAction = () => {
  const flowStore = useStoreApi();

  const getNewNodeInfo = useCallback((key?: string, option?: StudioCategoryOption, existedId?: string) => {
    if (!key || !option) return;

    const {
      transform: [transformX, transformY, zoomLevel],
    } = flowStore.getState();

    const { draggingPoint } = useStudioDndStore.getState();

    const mousePosition = useStudioFlowViewStore.getState().mousePosition;
    const transformedX = (mousePosition.x - transformX - (draggingPoint?.x || 0)) / zoomLevel;
    const transformedY = (mousePosition.y - transformY - (draggingPoint?.y || 0)) / zoomLevel;

    const id = existedId || v4();
    const position = {
      x: transformedX,
      y: transformedY,
    };

    const newNodeInfo = createNewBaseNode(id, position, {
      children: [],
      key,
    });

    if (!existedId) {
      const defaultValues = getFormDataFromCategoryOption(option || {});
      useStudioFormStore.getState().addForm(newNodeInfo.id, {
        ...defaultValues,
      });
    }

    return newNodeInfo;
  }, []);

  const removePartOfPackage = useCallback((node?: StudioNode, index?: number) => {
    if (!node) return {};

    node.data.metadata.children = cloneData(node.data.metadata.children).filter((_, i) => i < (index || 0));

    return {
      sourceNode: node,
    };
  }, []);

  const addToPackage = useCallback((node?: StudioNode, products?: (StudioNode | undefined)[]) => {
    if (!node || !products) return {};

    node.data.metadata.children = [...node.data.metadata.children, ...noUndefinedElement(products)];

    return {
      targetNode: node,
    };
  }, []);

  const movePartOfPackage = useCallback((fromNode?: StudioNode, toNode?: StudioNode, fromData?: DraggableData) => {
    if (!fromNode || !toNode || !fromData) return {};

    const addons = cloneData(fromNode.data.metadata.children).filter((_, index) => index >= (fromData?.childIndex || 0));

    addToPackage(toNode, addons);
    removePartOfPackage(fromNode, fromData?.childIndex || 0);

    return {
      targetNode: toNode,
      sourceNode: fromNode,
    };
  }, []);

  const removeProduct = useCallback((nodeId?: string) => {
    if (!nodeId) return;

    useStudioFlowStore.getState().removeNode(nodeId);
  }, []);

  const addProduct = useCallback((rootNode?: StudioNode, fromData?: DraggableData, fromOption?: StudioCategoryOption) => {
    if (!fromData?.optionKey || !fromOption) return {};

    const newNode = getNewNodeInfo(fromData.optionKey, fromOption);
    if (!newNode) return {};

    if (rootNode) {
      const newEdge = createNewBaseEdge(rootNode.id, newNode.id, true);

      rootNode.data.sourceHandles.push(getSourceHandle(rootNode.id, newNode.id));

      useStudioFlowStore.getState().addEdge(newEdge);
    }

    useStudioFlowStore.getState().addNode(newNode);

    return { rootNode, targetNode: newNode };
  }, []);

  const splitPackage = useCallback(
    (rootNode?: StudioNode, fromNode?: StudioNode, fromData?: DraggableData, fromOption?: StudioCategoryOption) => {
      if (!fromNode || !fromData || !rootNode) return {};

      const childData = !isNil(fromData.childIndex) ? fromNode.data.metadata.children[fromData.childIndex as number] : null;

      const newNode = getNewNodeInfo(fromData.optionKey, fromOption, childData?.id);

      if (newNode) {
        const newEdge = createNewBaseEdge(rootNode.id, newNode.id, true);

        newNode.data.metadata.children = cloneData(fromNode.data.metadata.children)
          .filter((_, index) => index > (fromData?.childIndex || 0))
          .map((child) => getNewNodeInfo(child.data.metadata.key, fromOption, child.id))
          .filter((child) => !!child);

        rootNode.data.sourceHandles.push(getSourceHandle(rootNode.id, newNode.id));

        useStudioFlowStore.getState().addNode(newNode);
        useStudioFlowStore.getState().addEdge(newEdge);
      }

      fromNode.data.metadata.children = fromNode.data.metadata.children.filter((_, index) => index < (fromData?.childIndex || 0));

      return {
        rootNode,
        sourceNode: fromNode,
        targetNode: newNode,
      };
    },
    [],
  );

  const mergeProducts = useCallback((fromNode?: StudioNode, toNode?: StudioNode, fromData?: DraggableData) => {
    if (!fromNode || !toNode || !fromData) return {};

    const clonedFromNode = cloneData(fromNode);
    clonedFromNode.data.metadata.children = [];

    addToPackage(toNode, [clonedFromNode, ...fromNode.data.metadata.children]);
    removeProduct(fromNode.id);

    return {
      sourceNode: fromNode,
      targetNode: toNode,
    };
  }, []);

  return {
    removeProduct,
    addProduct,
    removePartOfPackage,
    addToPackage,
    movePartOfPackage,
    splitPackage,
    mergeProducts,
    getNewNodeInfo,
  };
};

export default useDndAction;
