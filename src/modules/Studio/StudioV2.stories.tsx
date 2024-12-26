import type { Meta, StoryObj } from '@storybook/react';

import { useEffect, useRef } from 'react';
import { MODEL_CATEGORIES } from './constants/categories';
import { StudioV2, StudioV2Props, StudioV2Ref } from './v2/StudioV2';

type Story = StoryObj<typeof StudioV2>;

const args = {
  categories: MODEL_CATEGORIES,
  // dataSource: DATA_SOURCE,
} satisfies StudioV2Props;

const meta: Meta<typeof StudioV2> = {
  title: 'StudioV2',
  component: StudioV2,
  args,
};

export const Default: Story = {
  render: function useTabs(args) {
    const ref = useRef<StudioV2Ref>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.setData([]);
      }
    }, []);

    return (
      <div style={{ width: 'calc(100vw - 3rem)', height: 'calc(100vh - 3rem)' }}>
        <StudioV2
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
