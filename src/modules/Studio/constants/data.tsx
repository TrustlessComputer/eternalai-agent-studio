import { v4 } from 'uuid';

import { NodeType } from 'enums/node-type';
import { StudioDataNode } from '../types/graph';

export const GRAPH_DATA: StudioDataNode[] = [
  {
    id: v4(),
    keyMapper: '',
    title: 'Entry',
    children: [],
    nodeVisualType: NodeType.Entry,
  },
];
