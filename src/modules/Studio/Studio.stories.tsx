import type { Meta, StoryObj } from '@storybook/react';

import { Studio } from './Studio';
import { CREATE_MODEL_CATEGORIES } from './constants/categories';
import { GRAPH_DATA } from './constants/data';

type Story = StoryObj<typeof Studio>;

const meta: Meta<typeof Studio> = {
  title: 'Studio',
  component: Studio,
};

export const Default: Story = {
  render: function useTabs() {
    return (
      <div style={{ border: '1px solid #000', width: 'calc(100vw - 3rem)', height: 'calc(100vh - 3rem)' }}>
        <Studio categories={CREATE_MODEL_CATEGORIES} data={GRAPH_DATA} />
      </div>
    );
  },
};

export default meta;
