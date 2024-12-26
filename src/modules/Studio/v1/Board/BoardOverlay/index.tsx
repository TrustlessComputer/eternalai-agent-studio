import Overlay from '@/modules/Studio/components/Overlay';
import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import { memo } from 'react';

const BoardOverlay = () => {
  const { draggingData, draggingElement } = useDragMaskStore();

  return (
    <Overlay active={!draggingData?.isRight && !!draggingElement}>
      <span>Drop here to add</span>
    </Overlay>
  );
};

export default memo(BoardOverlay);
