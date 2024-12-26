import { Background, ConnectionMode, Controls, NodeTypes, OnNodeDrag, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';

import Droppable from '@/modules/Studio/components/DnD/Droppable';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import { OUTPUT_DROP_ID } from '../../constants/droppable-id';
import { NodeType } from '../../enums/node-type';
import { StudioNode } from '../../types/graph';
import { FlowView } from '../../types/ui';
import './Board.scss';
import BoardOverlay from './BoardOverlay';
// import useDragMaskStore from '../../stores/useDragMaskStore';

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

  useEffect(() => {
    setCurrentView(useStudioFlowViewStore.getState().view);
  }, [reloadFlowCounter]);

  return (
    <Droppable id={OUTPUT_DROP_ID} data={{}} className="board">
      <BoardOverlay />

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
        // nodesDraggable={false}
        // onNodeDrag={onNodeDrag}
        // onNodeDragStop={onNodeDragStop}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Droppable>
  );
}

export default Board;
