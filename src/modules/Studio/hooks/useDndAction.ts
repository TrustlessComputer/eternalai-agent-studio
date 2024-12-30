import { isNil } from '@/utils/data';
import { useStoreApi } from '@xyflow/react';
import { useCallback } from 'react';
import { v4 } from 'uuid';
import useStudioFlowStore from '../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../stores/useStudioFlowViewStore';
import useStudioFormStore from '../stores/useStudioFormStore';
import { StudioCategoryOption } from '../types/category';
import { DraggableDataType } from '../types/dnd';
import { StudioNode } from '../types/graph';
import { cloneData, getFormDataFromCategoryOption } from '../utils/data';
import { createNewBaseNode } from '../utils/node';

const useDndAction = () => {
  const flowStore = useStoreApi();

  const getNewNodeInfo = useCallback((keyMapper?: string, option?: StudioCategoryOption, existedId?: string) => {
    if (!keyMapper || !option) return;

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

    const newNodeInfo = createNewBaseNode(id, position, {
      children: [],
      keyMapper,
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
    if (!node || !index) return { sourceNode: node };

    node.data.metadata.children = cloneData(node.data.metadata.children).filter((_, i) => i < index);

    return {
      sourceNode: node,
    };
  }, []);

  const addToPackage = useCallback((node?: StudioNode, products?: (StudioNode | undefined)[]) => {
    if (!node || !products) return {};

    console.log('[useDndFlow] addToPackage', {
      products: [...products, ...node.data.metadata.children],
    });

    node.data.metadata.children = [...node.data.metadata.children, ...products.filter((product) => !!product)];

    return {
      targetNode: node,
    };
  }, []);

  const movePartOfPackage = useCallback((fromNode?: StudioNode, toNode?: StudioNode, fromData?: DraggableDataType) => {
    if (!fromNode || !toNode || !fromData) return { sourceNode: fromNode, targetNode: toNode };

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

  const addProduct = useCallback((fromData?: DraggableDataType, fromOption?: StudioCategoryOption) => {
    if (!fromData?.optionKey || !fromOption) return {};

    const newNode = getNewNodeInfo(fromData.optionKey, fromOption);

    if (!newNode) return {};

    useStudioFlowStore.getState().addNode(newNode);

    return { targetNode: newNode };
  }, []);

  const splitPackage = useCallback((fromNode?: StudioNode, fromData?: DraggableDataType, fromOption?: StudioCategoryOption) => {
    if (!fromNode || !fromData) return { sourceNode: fromNode };

    const childData = !isNil(fromData.childIndex) ? fromNode.data.metadata.children[fromData.childIndex as number] : null;

    const newNode = getNewNodeInfo(fromData.optionKey, fromOption, childData?.id);

    if (newNode) {
      newNode.data.metadata.children = cloneData(fromNode.data.metadata.children)
        .filter((_, index) => index > (fromData?.childIndex || 0))
        .map((child) => getNewNodeInfo(child.data.metadata.keyMapper, fromOption, child.id))
        .filter((child) => !!child);

      useStudioFlowStore.getState().addNode(newNode);
    }

    fromNode.data.metadata.children = fromNode.data.metadata.children.filter((_, index) => index < (fromData?.childIndex || 0));

    return {
      sourceNode: fromNode,
      targetNode: newNode,
    };
  }, []);

  const mergeProducts = useCallback((fromNode?: StudioNode, toNode?: StudioNode, fromData?: DraggableDataType) => {
    if (!fromNode || !toNode || !fromData) return { sourceNode: fromNode, targetNode: toNode };

    const clonedFromNode = cloneData(fromNode);
    clonedFromNode.data.metadata.children = [];

    console.log('[useDndFlow] addToPackage', {
      products: [clonedFromNode, ...fromNode.data.metadata.children],
    });

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
