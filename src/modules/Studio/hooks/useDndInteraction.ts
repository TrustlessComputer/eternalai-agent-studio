import { applyNodeChanges } from '@xyflow/react';
import { useCallback } from 'react';
import useStudioFlowStore from '../stores/useStudioFlowStore';
import { StudioNode } from '../types/graph';

const useDndInteraction = () => {
  const updateNodes = useCallback((nodes: (StudioNode | undefined)[]) => {
    const shouldUpdatedNodes = nodes.filter((node) => !!node);
    const updatedNodes = applyNodeChanges(
      shouldUpdatedNodes.map((node) => ({ id: node.id, type: 'position', position: node.position, positionAbsolute: node.position })),
      shouldUpdatedNodes,
    );

    useStudioFlowStore.getState().updateNodes(updatedNodes);
  }, []);

  return { updateNodes };
};

export default useDndInteraction;
