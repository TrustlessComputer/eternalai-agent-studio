import Overlay from '@/modules/Studio/components/Overlay';
import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DndZone } from '@/modules/Studio/types/dnd';
import { memo } from 'react';

const BoardOverlay = () => {
  const { draggingData, draggingElement } = useStudioDndStore();

  return (
    <Overlay active={draggingData?.type === DndZone.SOURCE && !!draggingElement}>
      <></>
    </Overlay>
  );
};

export default memo(BoardOverlay);
