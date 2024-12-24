import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import cs from 'clsx';
import './Droppable.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
};

function Droppable(props: Props) {
  const { id, style, className, children, ...rest } = props;
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      {...rest}
      style={{
        ...style,
      }}
      id={id}
      className={cs('droppable', className)}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}

export default Droppable;
