import React, { useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cs from 'clsx';
import './Draggable.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
};

function Draggable(props: Props) {
  const { id, style, className, children, ...rest } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const draggedStyle = useMemo(() => {
    if (transform) {
      return {
        transform: CSS.Translate.toString(transform),
      };
    }

    return {};
  }, [transform]);

  return (
    <div
      {...rest}
      {...listeners}
      {...attributes}
      id={id}
      style={{
        ...style,
        ...draggedStyle,
      }}
      className={cs('draggable', className)}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}

export default Draggable;
