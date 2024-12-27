import Overlay from '@/modules/Studio/components/Overlay';
import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DndType } from '@/modules/Studio/types/dnd';
import { memo } from 'react';

const BoardOverlay = () => {
  const { draggingData, draggingElement } = useStudioDndStore();

  return (
    <Overlay active={!!draggingData && draggingData.type === DndType.SOURCE && !!draggingElement}>
      <span>Drop here to add</span>
    </Overlay>
  );
};

export default memo(BoardOverlay);
