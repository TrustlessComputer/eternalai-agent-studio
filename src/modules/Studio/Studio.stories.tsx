import type { Meta, StoryObj } from '@storybook/react';

import { useEffect, useRef } from 'react';
import { Studio, StudioProps, StudioRef } from './Studio';
import { MODEL_CATEGORIES } from './constants/categories';
import { GRAPH_DATA_TEMPLATE_2 } from './constants/data';
import { DATA_SOURCE } from './constants/dataSource';

type Story = StoryObj<typeof Studio>;

const args = {
  categories: MODEL_CATEGORIES,
  dataSource: DATA_SOURCE,
} satisfies StudioProps;

const meta: Meta<typeof Studio> = {
  title: 'Studio',
  component: Studio,
  args,
};

export const Default: Story = {
  render: function useTabs(args) {
    const ref = useRef<StudioRef>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.setData(GRAPH_DATA_TEMPLATE_2);
      }
    }, []);

    return (
      <div style={{ width: 'calc(100vw - 3rem)', height: 'calc(100vh - 3rem)' }}>
        <Studio
          {...args}
          ref={ref}
          onChange={(data) => {
            console.log('[Studio] onChange', data);
          }}
        />
      </div>
    );
  },
};

export default meta;
