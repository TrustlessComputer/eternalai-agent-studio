import {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  NodeTypes,
  OnNodeDrag,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';

import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import { StudioNode } from '@/modules/Studio/types/graph';
import { FlowView } from '@/modules/Studio/types/ui';
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
    const intersection = getIntersectingNodes(node)[0];
  }, []);

  const onNodeDragStop: OnNodeDrag<StudioNode> = useCallback((event, node) => {}, []);

  useEffect(() => {
    setCurrentView(useStudioFlowViewStore.getState().view);
  }, [reloadFlowCounter]);

  return (
    <div className="board">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        edgesFocusable={false}
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
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Board;
