import { v4 } from 'uuid';

import { StudioDataNode } from '../types/graph';

export const GRAPH_DATA: StudioDataNode[] = [
  {
    id: v4(),
    keyMapper: '',
    title: 'Personality',
    children: [
      {
        id: v4(),
        keyMapper: '',
        title: 'Import from NFT',
        nodeVisualType: 'Slot',
        children: [],
      },
    ],
    nodeVisualType: 'Baseplate',
  },
];
