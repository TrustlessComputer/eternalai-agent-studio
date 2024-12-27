import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import { useDroppable } from '@dnd-kit/core';
import React, { memo } from 'react';
import './Droppable.scss';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> & {
  disabled?: boolean; // means the droppable do not accept any droppable
};

const Factory = ({ disabled, children, ...props }: Props) => {
  const { setNodeRef } = useDroppable({
    id: DndType.FACTORY,
    data: {
      type: DndType.FACTORY,
    } satisfies DraggableDataType,
    disabled,
  });

  return (
    <div
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

export default memo(Factory);
