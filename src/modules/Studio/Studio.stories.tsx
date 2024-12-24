import type { Meta, StoryObj } from '@storybook/react';

import { Studio } from './Studio';
import { MODEL_CATEGORIES } from './constants/categories';
import { GRAPH_DATA } from './constants/data';

type Story = StoryObj<typeof Studio>;

const meta: Meta<typeof Studio> = {
  title: 'Studio',
  component: Studio,
  args: {
    categories: MODEL_CATEGORIES,
    data: GRAPH_DATA,
  },
};

export const Default: Story = {
  render: function useTabs(args) {
    return (
      <div style={{ width: 'calc(100vw - 3rem)', height: 'calc(100vh - 3rem)' }}>
        <Studio
          {...args}
          onChange={(data) => {
            console.log('[Studio] onChange', data);
          }}
        />
      </div>
    );
  },
};

export default meta;
