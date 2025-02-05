import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useReactFlow } from '@xyflow/react';
import cx from 'clsx';
import { HTMLAttributes, useEffect, useMemo, useRef } from 'react';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DraggableData } from '@/modules/Studio/types/dnd';
import { DomRect, TouchingPoint } from '@/modules/Studio/types/ui';
import { calculateTouchingPercentage } from '@/modules/Studio/utils/ui';

import './Draggable.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: DraggableData;
  disabled?: boolean;
  handleOnDrag: (data: DraggableData, touchingPoint: DomRect | null) => void;
  handleOnDrop: (data: DraggableData) => void;
  isHidden?: boolean;
};

const Draggable = ({
  id,
  data,
  disabled = false,
  children,
  className,
  handleOnDrag,
  handleOnDrop,
  isHidden,
  ...props
}: Props) => {
  const { getZoom } = useReactFlow();
  const touchingPointRef = useRef<TouchingPoint>({ clientX: 0, clientY: 0 });

  const { attributes, listeners, setNodeRef, transform, isDragging, node, active } = useDraggable({
    id,
    disabled,
    data,
  });

  // const styles = useMemo(() => {
  //   if (isDragging) {
  //     const zoom = getZoom();
  //     // const rect = node.current?.getBoundingClientRect?.();
  //     // const width = (rect?.width || 0) / zoom;
  //     // const height = (rect?.height || 0) / zoom;

  //     // const rect = node.current?.getBoundingClientRect?.();

  //     const width = 0;
  //     const height = 0;

  //     let transformStr = CSS.Translate.toString(transform);

  //     const x = transform?.x || 0;
  //     const y = transform?.y || 0;

  //     const scaleX = transform?.scaleX || 1;
  //     const scaleY = transform?.scaleY || 1;

  //     let normalizedX = x;
  //     let normalizedY = y;

  //     if (zoom < 1) {
  //       normalizedX = (1 - zoom) * x - (zoom - 1) * x;
  //       normalizedY = (1 - zoom) * y - (zoom - 1) * y;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX - width,
  //         y: normalizedY - height,
  //         scaleX,
  //         scaleY,
  //       });
  //     } else if (zoom > 1) {
  //       normalizedX = ((1 - zoom) * x) / zoom;
  //       normalizedY = ((1 - zoom) * y) / zoom;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX - width,
  //         y: normalizedY - height,
  //         scaleX,
  //         scaleY,
  //       });
  //     } else {
  //       normalizedX = (1 - zoom) * x;
  //       normalizedY = (1 - zoom) * y;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX,
  //         y: normalizedY,
  //         scaleX,
  //         scaleY,
  //       });
  //     }

  //     return {
  //       ...props.style,

  //       transform: transformStr,
  //       opacity: isDragging || isHidden ? 0 : 1,
  //       // opacity: 1,
  //     };
  //   }

  //   return {
  //     ...props.style,
  //     opacity: isHidden ? 0 : 1,
  //   };
  // }, [transform, isDragging, props.style, isHidden, getZoom]);

  // const styles = useMemo(() => {
  //   if (isDragging) {
  //     const zoom = getZoom();

  //     const rect = node.current?.getBoundingClientRect?.();
  //     const width = (rect?.width || 0) / 2;
  //     const height = (rect?.height || 0) / 2;

  //     const bufferWidth = width - width * zoom;
  //     const bufferHeight = height - height * zoom;

  //     const x = transform?.x || 0;
  //     const y = transform?.y || 0;

  //     let normalizedX = x;
  //     let normalizedY = y;

  //     const scaleX = transform?.scaleX || 1;
  //     const scaleY = transform?.scaleY || 1;

  //     let transformStr = CSS.Translate.toString(transform);

  //     if (zoom < 1) {
  //       normalizedX = (1 - zoom) * x - (zoom - 1) * x;
  //       normalizedY = (1 - zoom) * y - (zoom - 1) * y;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX - bufferWidth,
  //         y: normalizedY - bufferHeight,
  //         scaleX,
  //         scaleY,
  //       });
  //     } else if (zoom > 1) {
  //       normalizedX = ((1 - zoom) * x) / zoom;
  //       normalizedY = ((1 - zoom) * y) / zoom;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX - bufferWidth,
  //         y: normalizedY - bufferHeight,
  //         scaleX,
  //         scaleY,
  //       });
  //     } else {
  //       normalizedX = (1 - zoom) * x;
  //       normalizedY = (1 - zoom) * y;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX,
  //         y: normalizedY,
  //         scaleX,
  //         scaleY,
  //       });
  //     }

  //     return {
  //       ...props.style,

  //       transform: transformStr,
  //       opacity: isDragging || isHidden ? 0 : 1,
  //       // opacity: 1,
  //     };
  //   }

  //   return {
  //     ...props.style,
  //     opacity: isDragging || isHidden ? 0 : 1,
  //   };
  // }, [transform, isDragging, props.style, isHidden, getZoom, node]);

  const styles = useMemo(() => {
    if (isDragging) {
      return {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging || isHidden ? 0 : 1,
      };
    }

    return {
      ...props.style,
      opacity: isDragging || isHidden ? 0 : 1,
    };
  }, [transform, isDragging, props.style, isHidden]);

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

  useEffect(() => {
    if (isDragging) {
      useStudioDndStore.getState().setTransform(transform);
    }
  }, [transform, isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={styles}
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
