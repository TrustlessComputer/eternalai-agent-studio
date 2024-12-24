import { Background, Controls, NodeTypes, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { OUTPUT_DROP_ID } from '../../constants/droppable-id';
import useStudioFlowStore from '../../stores/useStudioFlowStore';
import Droppable from '../DnD/Droppable';
import './Board.scss';

function Board({ nodeTypes }: { nodeTypes?: NodeTypes }) {
  const nodes = useStudioFlowStore((state) => state.nodes);
  const edges = useStudioFlowStore((state) => state.edges);
  const onNodesChange = useStudioFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useStudioFlowStore((state) => state.onEdgesChange);

  return (
    <Droppable id={OUTPUT_DROP_ID} data={{}} className="board">
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        deleteKeyCode=""
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </Droppable>
  );
}

export default Board;
