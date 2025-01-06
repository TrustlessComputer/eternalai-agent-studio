import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cx from 'clsx';
import { HTMLAttributes, memo, useEffect, useMemo, useRef } from 'react';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DraggableData, StudioZone } from '@/modules/Studio/types/dnd';
import { TouchingPoint } from '@/modules/Studio/types/ui';
import { calculateTouchingPercentage } from '@/modules/Studio/utils/ui';
import './Draggable.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableData, 'type'>;
  disabled?: boolean;
};

const Source = ({ id, data, disabled = false, children, ...props }: Props) => {
  const touchingPointRef = useRef<TouchingPoint>({ clientX: 0, clientY: 0 });

  const extendedData = useMemo(() => {
    return {
      ...data,
      type: StudioZone.ZONE_SOURCE,
    } satisfies DraggableData;
  }, [data, id]);

  const { attributes, listeners, setNodeRef, transform, isDragging, node } = useDraggable({
    id,
    disabled,
    data: extendedData,
  });

  const style = useMemo(
    () => ({
      ...props.style,
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0 : 1,
    }),
    [transform, isDragging, props.style],
  );

  useEffect(() => {
    if (isDragging) {
      const touchingPoint = node?.current ? calculateTouchingPercentage(node.current, touchingPointRef.current) : null;

      useStudioDndStore.getState().setDragging(children, extendedData, touchingPoint);
    } else {
      useStudioDndStore.getState().setDragging();
    }
    // no need push children to dependency array
  }, [isDragging, extendedData]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...props}
      {...listeners}
      {...attributes}
      className={cx('draggable', { 'draggable--disabled': disabled })}
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

export default memo(Source);
