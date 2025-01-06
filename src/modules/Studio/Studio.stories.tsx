import type { Meta, StoryObj } from '@storybook/react';

import { Studio, StudioProps } from './Studio';
import { CATEGORIES } from './mock-up/categories';
import { DATA_SOURCE } from './mock-up/data-source';

type Story = StoryObj<typeof Studio>;

const args = {
  categories: CATEGORIES,
  dataSource: DATA_SOURCE,
  data: [],
  disabledConnection: true,
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
