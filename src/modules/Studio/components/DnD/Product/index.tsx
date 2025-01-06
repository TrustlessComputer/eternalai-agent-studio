import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cx from 'clsx';
import { HTMLAttributes, memo, useEffect, useMemo } from 'react';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DraggableData, StudioZone } from '@/modules/Studio/types/dnd';
import './Draggable.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableData, 'type'>;
  disabled?: boolean;
  draggingFloating?: React.ReactNode;
};

const Product = ({ id, data, disabled = false, children, draggingFloating, ...props }: Props) => {
  const extendedData = useMemo(() => {
    return {
      ...data,
      type: StudioZone.ZONE_PRODUCT,
    } satisfies DraggableData;
  }, [data]);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
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
      if (draggingFloating) {
        useStudioDndStore.getState().setDragging(draggingFloating, extendedData);
      } else {
        useStudioDndStore.getState().setDragging(children, extendedData);
      }
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
    >
      {children}
    </div>
  );
};

export default memo(Product);
