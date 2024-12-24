import type { Meta, StoryObj } from '@storybook/react';
import { ReactFlowProvider } from '@xyflow/react';

import { Studio, StudioProps } from './Studio';
import { MODEL_CATEGORIES } from './constants/categories';
import { GRAPH_DATA } from './constants/data';

type Story = StoryObj<typeof Studio>;

const args = {
  categories: MODEL_CATEGORIES,
  data: GRAPH_DATA,
} satisfies StudioProps;

const meta: Meta<typeof Studio> = {
  title: 'Studio',
  component: Studio,
  args,
};

export const Default: Story = {
  render: function useTabs(args) {
    return (
      <div style={{ width: 'calc(100vw - 3rem)', height: 'calc(100vh - 3rem)' }}>
        <ReactFlowProvider>
          <Studio
            {...args}
            onChange={(data) => {
              console.log('[Studio] onChange', data);
            }}
          />
        </ReactFlowProvider>
      </div>
    );
  },
};

export default meta;
