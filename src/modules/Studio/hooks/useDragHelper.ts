import { DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

const useDragHelper = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log('drag start', event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('drag end', event);
  };

  return { sensors, handleDragStart, handleDragEnd };
};

