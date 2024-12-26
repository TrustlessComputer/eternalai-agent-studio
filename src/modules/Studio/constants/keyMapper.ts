import { NodeTypes } from '@xyflow/react';

import { NodeType } from '@/modules/Studio/enums/node-type';
import BaseNode from '../v1/CustomNodes/BaseNode';
import FactoryNode from '../v2/CustomNodes/FactoryNode';
import ProductNode from '../v2/CustomNodes/ProductNode';

export const CATEGORY_KEY_MAPPER = {};

export const FLOW_NODE_TYPES: NodeTypes = {
  // V1
  [NodeType.BASE]: BaseNode,

  // V2
  [NodeType.FACTORY]: FactoryNode,
  [NodeType.PRODUCT]: ProductNode,
};
