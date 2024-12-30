import { getEdgeParams } from '@/modules/Studio/utils/edge';
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  BaseEdge as RfBaseEdge,
  useInternalNode,
} from '@xyflow/react';
import React, { memo } from 'react';
import './BaseEdge.scss';

const BaseEdge = ({ id, source, target, markerEnd, style, label }: EdgeProps) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  });

  return (
    <React.Fragment key={id}>
      <RfBaseEdge id={id} path={edgePath} markerEnd={markerEnd} className="edge__line" style={style} />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="edge"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
          ></div>
        </EdgeLabelRenderer>
      )}
    </React.Fragment>
  );
};

export default memo(BaseEdge);