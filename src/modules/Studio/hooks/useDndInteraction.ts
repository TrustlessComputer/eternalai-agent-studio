import { applyNodeChanges } from '@xyflow/react';
import { useCallback } from 'react';
import useStudioFlowStore from '../stores/useStudioFlowStore';
import { StudioNode } from '../types/graph';

const useDndInteraction = () => {
  const updateNodes = useCallback((nodes: (StudioNode | undefined)[]) => {
    const updatedNodes = applyNodeChanges(
      nodes
        .filter((node) => !!node)
        .map((node) => ({ id: node.id, type: 'position', position: node.position, positionAbsolute: node.position })),
      nodes.filter((node) => !!node),
    );

    useStudioFlowStore.getState().updateNodes(updatedNodes);
  }, []);

  return { updateNodes };
};

export default useDndInteraction;
