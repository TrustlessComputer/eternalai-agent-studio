import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cx from 'clsx';
import { HTMLAttributes, memo, useEffect, useMemo } from 'react';

import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import { DataSchema, StudioCategoryOption } from '@/modules/Studio/types/category';
import './Draggable.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data?: {
    isRight?: boolean;
    isParent?: boolean;
    option: StudioCategoryOption;
    data?: DataSchema;
  };
  disabled?: boolean;
};

const Draggable = ({ id, data, disabled = false, children, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
    data,
  });

  const dragCategoryItem = useDragMaskStore((state) => state.dragCategoryItem);
  const dropCategoryItem = useDragMaskStore((state) => state.dropCategoryItem);

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
      dragCategoryItem(children);
    } else {
      dropCategoryItem();
    }
  }, [isDragging, children]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...props}
      {...listeners}
      {...attributes}
      className={cx('draggable', { 'draggable__disabled': disabled })}
    >
      {children}
    </div>
  );
};

export default memo(Draggable);
