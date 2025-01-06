import { EdgeTypes, NodeTypes } from '@xyflow/react';

import BaseEdge from '../components/CustomEdges/BaseEdge';
import BaseNode from '../components/CustomNodes/BaseNode';

import { EdgeType, NodeType } from '@/enums/node-type';

export const CATEGORY_KEY_MAPPER = {};

export const DEFAULT_NODE_TYPES: NodeTypes = {
  [NodeType.BASE_NODE]: BaseNode,
};

export const DEFAULT_EDGE_TYPES: EdgeTypes = {
  [EdgeType.BASE_EDGE]: BaseEdge,
};
