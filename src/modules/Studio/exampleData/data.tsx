import { v4 } from 'uuid';
import { StudioDataNode } from '../types/graph';

export const GRAPH_DATA_TEMPLATE_1: StudioDataNode[] = [
  {
    'id': 'b61b6eb8-f450-43e1-bf5b-c4d7b1952e3e',
    'keyMapper': 'agent-option-1',
    'title': 'New Agent',
    'children': [],
    'data': {
      agentName: 'template 1',
    },
    'rect': {
      'position': {
        'x': 409.5,
        'y': 500,
      },
    },
  },
  {
    'id': '14c03648-b7e3-4488-9d5e-2d751ad7bb09',
    'keyMapper': 'network-option-2',
    'title': 'Import from Ordinals',
    'children': [],
    'data': {},
    'rect': {
      'position': {
        'x': 474.5,
        'y': 507,
      },
    },
  },
  {
    'id': 'dda87254-ebae-46c9-9528-b9f609172aa8',
    'keyMapper': 'network-option-4',
    'title': 'New personality',
    'children': [],
    'data': {},
    'rect': {
      'position': {
        'x': 869.5,
        'y': 474,
      },
    },
  },
  {
    'id': 'f10f6b83-0bd1-4f82-b057-e935f1179a44',
    'keyMapper': 'network-option-1',
    'title': 'Import from NFT',
    'children': [],
    'data': {},
    'rect': {
      'position': {
        'x': 229.5,
        'y': 167,
      },
    },
  },
];

export const GRAPH_DATA_TEMPLATE_2: StudioDataNode[] = [
  {
    'id': `red-alert-${v4()}`,
    'keyMapper': 'agent-option-1',
    'title': 'New Agent',
    'children': [
      {
        'id': '14c03648-b7e3-4488-9d5e-2d751ad7bb09',
        'keyMapper': 'network-option-2',
        'title': 'Import from Ordinals',
        'children': [],
        'data': {
          network: 'BNB',
        },
        'rect': {
          'position': {
            'x': 484.5,
            'y': 418,
          },
        },
      },
      {
        'id': 'f10f6b83-0bd1-4f82-b057-e935f1179a44',
        'keyMapper': 'network-option-1',
        'title': 'Import from NFT',
        'children': [],
        'data': {},
        'rect': {
          'position': {
            'x': 456.5,
            'y': 546,
          },
        },
      },
      {
        'id': v4(),
        'keyMapper': 'network-option-1',
        'title': 'Import from NFT',
        'children': [],
        'data': {},
        'rect': {
          'position': {
            'x': 456.5,
            'y': 546,
          },
        },
      },
      {
        'id': v4(),
        'keyMapper': 'network-option-1',
        'title': 'Import from NFT',
        'children': [],
        'data': {},
        'rect': {
          'position': {
            'x': 456.5,
            'y': 546,
          },
        },
      },
      {
        'id': v4(),
        'keyMapper': 'network-option-1',
        'title': 'Import from NFT',
        'children': [],
        'data': {},
        'rect': {
          'position': {
            'x': 456.5,
            'y': 546,
          },
        },
      },
    ],
    'data': {
      agentName: 'template 2',
    },
    'rect': {
      'position': {
        'x': 409.5,
        'y': 500,
      },
    },
  },
  {
    'id': v4(),
    'keyMapper': 'network-option-4',
    'title': 'New personality',
    'children': [],
    'data': {
      network: 'base',
    },
    'rect': {
      'position': {
        'x': 869.5,
        'y': 474,
      },
    },
  },

  {
    'id': v4(),
    'keyMapper': 'network-option-4',
    'title': 'New personality',
    'children': [],
    'data': {
      network: 'base',
    },
    'rect': {
      'position': {
        'x': 500.5,
        'y': 300,
      },
    },
  },
];
