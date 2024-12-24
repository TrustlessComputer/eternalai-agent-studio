import { NodeTypes } from '@xyflow/react';

import EntryNode from '../components/CustomNodes/EntryNode';
import PieceNode from '../components/CustomNodes/PieceNode';

import { NodeType } from '@/enums/node-type';

export const CATEGORY_KEY_MAPPER = {};

export const FLOW_NODE_TYPES: NodeTypes = {
  [NodeType.Entry]: EntryNode,
  [NodeType.Piece]: PieceNode,
};
