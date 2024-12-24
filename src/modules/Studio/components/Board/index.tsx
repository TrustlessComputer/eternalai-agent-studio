import { Background, ConnectionMode, Controls, NodeTypes, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';

import { OUTPUT_DROP_ID } from '../../constants/droppable-id';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../../stores/useStudioFlowViewStore';
import { FlowView } from '../../types/ui';
import Droppable from '../DnD/Droppable';
import './Board.scss';

function Board({ nodeTypes }: { nodeTypes?: NodeTypes }) {
  const nodes = useStudioFlowStore((state) => state.nodes);
  const edges = useStudioFlowStore((state) => state.edges);
  const onNodesChange = useStudioFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useStudioFlowStore((state) => state.onEdgesChange);

  const reloadFlowCounter = useStudioFlowStore((state) => state.reloadFlowCounter);
  const setView = useStudioFlowViewStore((state) => state.setView);

  const [currentView, setCurrentView] = useState<FlowView>({
    x: 0,
    y: 0,
    zoom: 1,
  });

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
        fitView
        fitViewOptions={{ padding: 1 }}
        deleteKeyCode=""
        defaultViewport={currentView}
        onViewportChange={setView}
        zoomOnDoubleClick={false}
        connectionMode={ConnectionMode.Loose}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Droppable>
  );
}

export default Board;
