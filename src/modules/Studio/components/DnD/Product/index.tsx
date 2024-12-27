import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cx from 'clsx';
import { HTMLAttributes, memo, useEffect, useMemo } from 'react';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DndType, DraggableDataType } from '@/modules/Studio/types/dnd';
import './Draggable.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableDataType, 'type'>;
  disabled?: boolean;
};

const Product = ({ id, data, disabled = false, children, ...props }: Props) => {
  const extendedData = useMemo(() => {
    return {
      ...data,
      type: DndType.PRODUCT,
    } satisfies DraggableDataType;
  }, [data, id]);

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
      useStudioDndStore.getState().setDragging(children, extendedData);
    } else {
      useStudioDndStore.getState().setDragging(null, null);
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
