import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import AGENT_MODEL_CATEGORIES from './__mocks__/agent-categories';
import { AGENT_DATA_SOURCE } from './__mocks__/agent-data-source';
import { Studio, StudioProps, StudioRef } from './Studio';

type Story = StoryObj<typeof Studio>;

const args = {
  categories: AGENT_MODEL_CATEGORIES,
  dataSource: AGENT_DATA_SOURCE,
  data: [
    {
      'id': '0a677e8c-ee49-455a-91b5-b60562ce61da',
      'idx': 'agent_new',
      'title': 'New Agent',
      'children': [
        {
          'id': '9030cec4-2d92-4c0a-854b-8ea47dd4870c',
          'idx': 'blockchain_bnb',
          'title': 'BNB',
          'children': [],
          'data': {},
          'rect': {
            'position': {
              'x': 207.65625,
              'y': 209,
            },
          },
        },
        {
          'id': '2445ef81-c0e0-4904-8eab-12bb0d865345',
          'idx': 'blockchain_bitcoin',
          'title': 'Bitcoin',
          'children': [],
          'data': {},
          'rect': {
            'position': {
              'x': 210.5625,
              'y': 260,
            },
          },
        },
        {
          'id': '6458c763-191a-4aca-98a3-b05baac5d81f',
          'idx': 'decentralize_inference_intellect_1_10b',
          'title': 'INTELLECT 1 10B',
          'children': [],
          'data': {},
          'rect': {
            'position': {
              'x': 252.4375,
              'y': 208,
            },
          },
        },
        {
          'id': '7a40cd37-3f65-4e07-8d04-60ca0ef6279e',
          'idx': 'personality_customize',
          'title': 'New personality',
          'children': [
            {
              'id': '62dda3c4-f5f5-4057-babc-5aebf0dbdcfd',
              'idx': 'token_bnb',
              'title': 'BNB',
              'children': [],
              'data': {},
              'rect': {
                'position': {
                  'x': 248.203125,
                  'y': 559,
                },
              },
            },
          ],
          'data': {},
          'rect': {
            'position': {
              'x': 268,
              'y': 510,
            },
          },
        },
      ],
      'data': {
        'agentName': '',
      },
      'rect': {
        'position': {
          'x': 293,
          'y': 175,
        },
      },
    },
    {
      'id': '5e8fc36f-ad81-462c-a656-0363ccca7a50',
      'idx': 'token_bnb',
      'title': 'BNB',
      'children': [],
      'data': {},
      'rect': {
        'position': {
          'x': 859.203125,
          'y': 536,
        },
      },
    },
  ],
} satisfies StudioProps;

const meta: Meta<typeof Studio> = {
  title: 'Studio',
  component: Studio,
  args,
};

export const AgentStudio: Story = {
  render: function useTabs(args) {
    const ref = useRef<StudioRef>(null);
    const [cate, setCate] = useState(args.categories);

    useEffect(() => {
      const timeout = setTimeout(() => {
        ref.current?.getOptionPlaceQuantity('personality_option_1');
      }, 10_000);

      return () => clearTimeout(timeout);
    }, []);

    return (
      <div style={{ width: 'calc(100vw - 3rem)', height: 'calc(100vh - 3rem)' }}>
        <Studio
          {...args}
          categories={cate}
          ref={ref}
          onChange={(data) => {
            console.log('[Studio] onChange', data);
            // disable personality if have existed
          }}
        />
      </div>
    );
  },
};

export default meta;
