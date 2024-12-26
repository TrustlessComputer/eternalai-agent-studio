import { DragEndEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useStoreApi } from '@xyflow/react';

import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import { useCallback } from 'react';

const useStudioDnD = () => {
  const addNode = useStudioFlowStore((state) => state.addNode);
  const removeNode = useStudioFlowStore((state) => state.removeNode);
  const setNodes = useStudioFlowStore((state) => state.setNodes);
  const reloadFlow = useStudioFlowStore((state) => state.reloadFlow);
  const flowStore = useStoreApi();

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = useCallback((_event: DragStartEvent) => {}, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active: lego, over } = event;

    if (!lego || !over) return;
  }, []);

  return { sensors, handleDragStart, handleDragEnd };
};

export default useStudioDnD;
