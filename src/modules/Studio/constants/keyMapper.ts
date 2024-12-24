import { NodeTypes } from '@xyflow/react';

import BaseNode from '../components/CustomNodes/BaseNode';

import { NodeType } from '@/enums/node-type';

export const CATEGORY_KEY_MAPPER = {};

export const FLOW_NODE_TYPES: NodeTypes = {
  [NodeType.BASE_NODE]: BaseNode,
};
