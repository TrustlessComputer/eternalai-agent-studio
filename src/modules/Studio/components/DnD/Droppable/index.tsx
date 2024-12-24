import { useDroppable } from '@dnd-kit/core';
import cs from 'clsx';
import React, { memo } from 'react';
import './Droppable.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: {
    isRight?: boolean;
    isParent?: boolean;
  };
  disabled?: boolean; // means the droppable do not accept any droppable
};

const Droppable = ({ id, data, disabled, children, className, ...props }: Props) => {
  const { setNodeRef } = useDroppable({
    id,
    data,
    disabled,
  });

  return (
    <div
      id={id}
      className={cs('droppable', className)}
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

export default memo(Droppable);
