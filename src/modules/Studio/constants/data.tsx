import { v4 } from 'uuid';

export const GRAPH_DATA = [
  {
    id: v4(),
    keyMapper: '',
    title: 'Personality',
    required: true,
    children: [
      {
        id: v4(),
        keyMapper: '',
        title: 'Import from NFT',
        value: 0,
        tooltip: '',
        icon: 'https://storage.googleapis.com/eternal-ai/agent-studio-v2/ic_personality_nft.svg',
        order: 0,
      },
    ],
    type: 'Baseplate',
  },
];
