import { DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

const useStudioDnD = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log('[useStudioDnd] drag start', event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('[useStudioDnd] drag end', event);
  };

  return { sensors, handleDragStart, handleDragEnd };
};


export default useStudioDnD;
