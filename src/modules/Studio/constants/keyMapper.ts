import { NodeTypes } from '@xyflow/react';

import { NodeType } from '@/modules/Studio/enums/node-type';
import BaseNode from '../v1/CustomNodes/BaseNode';
import EntryNode from '../v2/CustomNodes/EntryNode';
import InputNode from '../v2/CustomNodes/InputNode';
import OutputNode from '../v2/CustomNodes/OutputNode';

export const CATEGORY_KEY_MAPPER = {};

export const FLOW_NODE_TYPES: NodeTypes = {
  // V1
  [NodeType.BASE]: BaseNode,

  // V2
  [NodeType.ENTRY]: EntryNode,
  [NodeType.INPUT]: InputNode,
  [NodeType.OUTPUT]: OutputNode,
};
