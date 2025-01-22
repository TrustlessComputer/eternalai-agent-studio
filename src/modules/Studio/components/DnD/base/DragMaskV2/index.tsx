import { DragOverlay } from '@dnd-kit/core';
import { memo, useEffect, useRef } from 'react';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { useStoreApi } from '@xyflow/react';

const DragMaskV2 = () => {
  const draggingElement = useStudioDndStore((state) => state.draggingElement);

  const flowStore = useStoreApi();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const trackMousePosition = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', trackMousePosition);

    return () => {
      window.removeEventListener('mousemove', trackMousePosition);
    };
  }, []);

  useEffect(() => {
    if (!draggingElement) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = '0';
        wrapperRef.current.style.pointerEvents = 'none';
        wrapperRef.current.style.userSelect = 'none';
      }

      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    const updatePosition = () => {
      const { x, y } = mousePositionRef.current;
      const {
        transform: [transformX, transformY, zoomLevel],
      } = flowStore.getState();
      const touchPoint = useStudioDndStore.getState().draggingPoint;
      const translateX = x - (touchPoint?.x ?? 0) / zoomLevel;
      const translateY = y - (touchPoint?.y ?? 0) / zoomLevel;
      const transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = transform;
      }

      frameRef.current = requestAnimationFrame(updatePosition);
    };

    frameRef.current = requestAnimationFrame(updatePosition);

    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = '0.7';
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [draggingElement]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, opacity: 0.7 }} ref={wrapperRef}>
      {draggingElement}
    </div>
  );
};

export default memo(DragMaskV2);
