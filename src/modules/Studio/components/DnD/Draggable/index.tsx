import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { HTMLAttributes, memo, useMemo } from 'react';
import './Draggable.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: {
    isRight?: boolean;
    isParent?: boolean;
  };
  useMask?: boolean;
  disabled?: boolean;
};

const Draggable = ({ id, data, useMask, disabled, children, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
    data,
  });

  const style = useMemo(
    () => ({
      ...props.style,
      transform: CSS.Translate.toString(transform),
      opacity: useMask && isDragging ? 0 : 1,
    }),
    [transform, useMask, isDragging, props.style],
  );

  return (
    <div ref={setNodeRef} style={style} {...props} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default memo(Draggable);
