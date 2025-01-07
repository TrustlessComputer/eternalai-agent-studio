import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import useStudioFlowStore from '../stores/useStudioFlowStore';

export const getOptionNodesExistInNode = (nodeId: string, optionKey: string) => {
  try {
    const nodes = useStudioFlowStore.getState().nodes;

    const matchedNode = nodes.find((node) => node.id === nodeId);
    if (!matchedNode) {
      return [];
    }

    const foundItem = [];
    // check is self
    if (matchedNode.data.metadata.idx === optionKey) {
      foundItem.push(matchedNode);
    }

    // check children
    const childrenOption = matchedNode.data.metadata.children.filter((node) => node.data.metadata.idx === optionKey);
    foundItem.push(...childrenOption);

    return foundItem;
  } catch (e) {
    return [];
  }
};

export const getOptionNodesSameCategoryExistInNode = (nodeId: string, optionKey: string) => {
  try {
    const option = useStudioCategoryStore.getState().categoryOptionMap[optionKey];
    if (!option || !option.parent) {
      return [];
    }

    const optionKeys = option.parent.options.map((option) => option.idx);

    const foundItem = optionKeys
      .map((option) => {
        return getOptionNodesExistInNode(nodeId, option);
      })
      .flat();

    return foundItem;
  } catch (e) {
    return [];
  }
};

export const getRelatedNodes = (nodeId: string) => {
  const linkedNodes = useStudioFlowStore.getState().linkedNodes;
  const relatedNodes = linkedNodes[nodeId] || [];

  const nodes = useStudioFlowStore.getState().nodes;
  return nodes.filter((node) => relatedNodes.includes(node.id));
};
