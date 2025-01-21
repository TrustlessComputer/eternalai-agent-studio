import { Background, ConnectionMode, Controls, MiniMap, ReactFlow, Viewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useMemo, useState } from 'react';

import BoardOverlay from './BoardOverlay';
import { DEFAULT_EDGE_TYPES, DEFAULT_NODE_TYPES } from '../../constants/key-map';
import useStudioConfigStore from '../../stores/useStudioConfigStore';
import useStudioDataStore from '../../stores/useStudioDataStore';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../../stores/useStudioFlowViewStore';
import Distribution from '../DnD/Distribution';
import './Board.scss';
import useStudioStore from '@/modules/Studio/stores/useStudioStore';

function Board() {
  const { isDrew } = useStudioStore();
  const initialViewport = useStudioDataStore((state) => state.viewport);
  const boardConfig = useStudioConfigStore((state) => state.config.board);

  const disabledConnection = useStudioDataStore((state) => state.disabledConnection);
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
    if (!disabledConnection) {
      return edges;
    }

    return [];
  }, [edges, disabledConnection]);

  useEffect(() => {
    setCurrentView(useStudioFlowViewStore.getState().view);
  }, [reloadFlowCounter]);

  return (
    <Distribution className="board">
      <BoardOverlay />
      <ReactFlow
        key={isDrew ? JSON.stringify(currentView) : JSON.stringify(initialViewport)}
        nodes={nodes}
        nodeTypes={DEFAULT_NODE_TYPES}
        onNodesChange={onNodesChange}
        edges={renderEdges}
        edgeTypes={DEFAULT_EDGE_TYPES}
        onEdgesChange={onEdgesChange}
        onViewportChange={setView}
        defaultViewport={isDrew ? currentView : initialViewport}
        edgesFocusable={false}
        deleteKeyCode=""
        fitViewOptions={{ padding: 1 }}
        connectionMode={ConnectionMode.Loose}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        disableKeyboardA11y
        {...boardConfig}
      >
        <Controls fitViewOptions={{ padding: 1 }} />
        <Background />
        <MiniMap />
      </ReactFlow>
    </Distribution>
  );
}

export default Board;
