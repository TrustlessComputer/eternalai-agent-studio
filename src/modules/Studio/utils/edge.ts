import { Edge } from '@xyflow/react';

import { EdgeType } from '@/enums/node-type';
import { MarkerType } from '@xyflow/react';
import { v4 } from 'uuid';

export const getSourceHandle = (source: string, target: string) => {
  return `${source}-s-${target}`;
};

export const getTargetHandle = (source: string, target: string) => {
  return `${target}-t-${source}`;
};

export const createNewBaseEdge = (source: string, target: string, animated: boolean = false): Edge => {
  return {
    id: v4(),
    source,
    sourceHandle: getSourceHandle(source, target),
    target,
    targetHandle: getTargetHandle(source, target),
    type: EdgeType.BASE_EDGE,
    selectable: false,
    selected: false,
    focusable: false,
    label: '',
    animated,
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      strokeWidth: 1,
      color: '#AAAAAA',
    },
    style: {
      stroke: '#AAAAAA',
      strokeWidth: 2,
    },
  } satisfies Edge;
};
