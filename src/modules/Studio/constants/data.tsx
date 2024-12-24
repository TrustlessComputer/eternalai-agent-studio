import { v4 } from 'uuid';

import { StudioDataNode } from '../types/graph';

import { NodeType } from '@/enums/node-type';

export const GRAPH_DATA: StudioDataNode[] = [
  {
    id: v4(),
    keyMapper: '',
    title: 'Entry',
    children: [],
    nodeVisualType: NodeType.Entry,
  },
];
