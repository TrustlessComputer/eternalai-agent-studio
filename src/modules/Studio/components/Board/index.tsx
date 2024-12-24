import { Background, Controls, ReactFlow } from '@xyflow/react';

import './Board.scss';

function Board() {
  return (
    <div className="board">
      <ReactFlow fitView nodeTypes={{}} style={{ backgroundColor: '#F7F9FB' }}>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Board;
