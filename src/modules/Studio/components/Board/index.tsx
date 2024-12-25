import { Background, ConnectionMode, Controls, NodeTypes, OnNodeDrag, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';

import { OUTPUT_DROP_ID } from '../../constants/droppable-id';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../../stores/useStudioFlowViewStore';
import { FlowView } from '../../types/ui';
import Droppable from '../DnD/Droppable';

import { StudioNode } from '../../types/graph';
import './Board.scss';

function Board({ nodeTypes }: { nodeTypes?: NodeTypes }) {
  const { getIntersectingNodes } = useReactFlow();

  const nodes = useStudioFlowStore((state) => state.nodes);
  const edges = useStudioFlowStore((state) => state.edges);
  const setNodes = useStudioFlowStore((state) => state.setNodes);
  const setEdges = useStudioFlowStore((state) => state.setEdges);
  const onNodesChange = useStudioFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useStudioFlowStore((state) => state.onEdgesChange);

  const reloadFlowCounter = useStudioFlowStore((state) => state.reloadFlowCounter);
  const reloadFlow = useStudioFlowStore((state) => state.reloadFlow);
  const setView = useStudioFlowViewStore((state) => state.setView);

  const [currentView, setCurrentView] = useState<FlowView>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const onNodeDrag: OnNodeDrag<StudioNode> = useCallback((event, node) => {
    const nodes = useStudioFlowStore.getState().nodes;
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    setNodes(
      nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          className: intersections.includes(n.id) ? 'node-base__highlight' : '',
        },
      })),
    );

    reloadFlow();
  }, []);

  const onNodeDragStop: OnNodeDrag<StudioNode> = useCallback((event, node) => {
    const nodes = useStudioFlowStore.getState().nodes;
    const intersection = getIntersectingNodes(node)[0];

    if (intersection) {
      const newNodes = nodes.filter((n) => n.id !== node.id);
      const newEdges = edges.filter((e) => e.source !== node.id && e.target !== node.id);

      const intersectionNode = newNodes.find((n) => n.id === intersection.id);

      if (intersectionNode) {
        intersectionNode.data.metadata.children = [
          ...(intersectionNode.data.metadata.children || []),
          {
            category: node.data.metadata.category,
            option: node.data.metadata.option,
          },
          ...(node.data.metadata.children || []),
        ];

        console.log('[Board] onNodeDragStop', newNodes);

        setNodes(newNodes);
        setEdges(newEdges);
        reloadFlow();
      }
    }
  }, []);

  useEffect(() => {
    setCurrentView(useStudioFlowViewStore.getState().view);
  }, [reloadFlowCounter]);

  return (
    <Droppable id={OUTPUT_DROP_ID} data={{}} className="board">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        edgesFocusable={false}
        fitViewOptions={{ padding: 1 }}
        deleteKeyCode=""
        defaultViewport={currentView}
        onViewportChange={setView}
        connectionMode={ConnectionMode.Loose}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Droppable>
  );
}

export default Board;
