import type { Meta, StoryObj } from '@storybook/react';

import { Studio, StudioProps, StudioRef } from './Studio';
import { AGENT_DATA_SOURCE } from './mock-up/agent-data-source';
import { AGENT_MODEL_CATEGORIES } from './mock-up/agent-categories';
import { useEffect, useRef, useState } from 'react';

type Story = StoryObj<typeof Studio>;

const args = {
  categories: AGENT_MODEL_CATEGORIES,
  dataSource: AGENT_DATA_SOURCE,
  data: [],
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
