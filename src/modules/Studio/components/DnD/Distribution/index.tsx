import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import { useDroppable } from '@dnd-kit/core';
import cx from 'clsx';
import React, { memo } from 'react';
import './Droppable.scss';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> & {
  disabled?: boolean;
};

const Distribution = ({ disabled, children, className, ...props }: Props) => {
  const { setNodeRef } = useDroppable({
    id: DndType.DISTRIBUTION,
    data: {
      type: DndType.DISTRIBUTION,
    } satisfies DraggableDataType,
    disabled,
  });

  return (
    <div
      className={cx('droppable-board', className)}
      ref={setNodeRef}
      style={{
        width: '100%',
        height: '100%',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default memo(Distribution);
