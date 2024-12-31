import { Handle, Position } from '@xyflow/react';
import './BaseNodeConnection.scss';

const BaseNodeConnection = () => {
  return (
    <>
      <Handle
        id="a"
        type="source"
        position={Position.Top}
        className="base-node__handles__handle"
        isConnectable={false}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="base-node__handles__handle"
        isConnectable={false}
      />
      <Handle
        id="c"
        type="source"
        position={Position.Bottom}
        className="base-node__handles__handle"
        isConnectable={false}
      />
      <Handle
        id="d"
        type="source"
        position={Position.Left}
        className="base-node__handles__handle"
        isConnectable={false}
      />
    </>
  );
};

export default BaseNodeConnection;
