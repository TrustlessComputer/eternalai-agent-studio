import { Background, ConnectionMode, Controls, MiniMap, ReactFlow, Viewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_EDGE_TYPES, DEFAULT_NODE_TYPES } from '../../constants/key-map';
import useStudioDataStore from '../../stores/useStudioDataStore';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../../stores/useStudioFlowViewStore';
import Distribution from '../DnD/Distribution';
import './Board.scss';
import BoardOverlay from './BoardOverlay';

function Board() {
  const showConnectLine = useStudioDataStore((state) => state.showConnectLine);
  const nodes = useStudioFlowStore((state) => state.nodes);
  const edges = useStudioFlowStore((state) => state.edges);

  const onNodesChange = useStudioFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useStudioFlowStore((state) => state.onEdgesChange);

  const reloadFlowCounter = useStudioFlowStore((state) => state.reloadFlowCounter);
  const setView = useStudioFlowViewStore((state) => state.setView);

  const [currentView, setCurrentView] = useState<Viewport>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const renderEdges = useMemo(() => {
    if (showConnectLine) {
      return edges;
    }

    return [];
  }, [edges, showConnectLine]);

  useEffect(() => {
    setCurrentView(useStudioFlowViewStore.getState().view);
  }, [reloadFlowCounter]);

  return (
    <Distribution className="board">
      <BoardOverlay />
      <ReactFlow
        nodes={nodes}
        nodeTypes={DEFAULT_NODE_TYPES}
        onNodesChange={onNodesChange}
        edges={renderEdges}
        edgeTypes={DEFAULT_EDGE_TYPES}
        onEdgesChange={onEdgesChange}
        onViewportChange={setView}
        defaultViewport={currentView}
        edgesFocusable={false}
        deleteKeyCode=""
        fitViewOptions={{ padding: 1 }}
        connectionMode={ConnectionMode.Loose}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        disableKeyboardA11y
        minZoom={1}
        maxZoom={1}
      >
        <Controls fitViewOptions={{ padding: 1 }} />
        <Background />
        <MiniMap />
      </ReactFlow>
    </Distribution>
  );
}

export default Board;
