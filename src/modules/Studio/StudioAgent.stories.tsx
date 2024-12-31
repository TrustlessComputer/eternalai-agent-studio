import type { Meta, StoryObj } from '@storybook/react';

import { Studio, StudioProps } from './Studio';
import { AGENT_DATA_SOURCE } from './exampleData/agent-dataSource';
import { AGENT_MODEL_CATEGORIES } from './exampleData/agent-categories';

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
    return (
      <div style={{ width: 'calc(100vw - 3rem)', height: 'calc(100vh - 3rem)' }}>
        <Studio
          {...args}
          // ref={ref}
          onChange={(data) => {
            console.log('[Studio] onChange', data);
          }}
        />
      </div>
    );
  },
};

export default meta;
