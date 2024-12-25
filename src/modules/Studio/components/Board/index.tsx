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
  const onNodesChange = useStudioFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useStudioFlowStore((state) => state.onEdgesChange);

  const reloadFlowCounter = useStudioFlowStore((state) => state.reloadFlowCounter);
  const setView = useStudioFlowViewStore((state) => state.setView);

  const [currentView, setCurrentView] = useState<FlowView>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const onNodeDrag: OnNodeDrag<StudioNode> = useCallback((event, node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    // setNodes((nodes) =>
    //   nodes.map((n) => ({
    //     ...n,
    //     className: intersections.includes(n.id) ? 'highlight' : '',
    //   })),
    // );
  }, []);

  useEffect(() => {
    console.log('[Board] useEffect[reloadFlowCounter]', useStudioFlowViewStore.getState().view);
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
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Droppable>
  );
}

export default Board;
