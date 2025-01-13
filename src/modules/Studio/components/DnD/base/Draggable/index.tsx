import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cx from 'clsx';
import { HTMLAttributes, useEffect, useRef } from 'react';

import { DraggableData } from '@/modules/Studio/types/dnd';
import { DomRect, TouchingPoint } from '@/modules/Studio/types/ui';
import { calculateTouchingPercentage } from '@/modules/Studio/utils/ui';
import { useStoreApi } from '@xyflow/react';
import './Draggable.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: DraggableData;
  disabled?: boolean;
  handleOnDrag: (data: DraggableData, touchingPoint: DomRect | null) => void;
  handleOnDrop: (data: DraggableData) => void;
};

const Draggable = ({
  id,
  data,
  disabled = false,
  children,
  className,
  handleOnDrag,
  handleOnDrop,
  ...props
}: Props) => {
  const touchingPointRef = useRef<TouchingPoint>({ clientX: 0, clientY: 0 });

  const {
    transform: [transformX, transformY, zoomLevel],
  } = useStoreApi().getState();

  const { attributes, listeners, setNodeRef, transform, isDragging, node } = useDraggable({
    id,
    disabled,
    data,
  });

  const processTransform = (_transform: typeof transform) => {
    if (!_transform) return;

    const { x, y } = _transform;

    const transformString = CSS.Translate.toString({
      ..._transform,
      x: x + x / zoomLevel,
      y: y + y / zoomLevel,
    });

    return transformString;
  };

  const style = {
    ...props.style,
    transform: processTransform(transform),
    opacity: isDragging ? 0 : 1,
  };

  useEffect(() => {
    if (isDragging) {
      const touchingPointAt = node?.current
        ? calculateTouchingPercentage(node.current, touchingPointRef.current)
        : null;

      handleOnDrag(data, touchingPointAt);
    } else {
      handleOnDrop(data);
    }
  }, [isDragging, data]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...props}
      {...listeners}
      {...attributes}
      className={cx('draggable', { 'draggable--disabled': disabled }, className)}
      onMouseMove={(e) => {
        touchingPointRef.current = {
          clientX: e.clientX,
          clientY: e.clientY,
        };
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
