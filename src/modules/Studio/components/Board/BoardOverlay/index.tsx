import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import { memo } from 'react';
import Overlay from '../../Overlay';

const BoardOverlay = () => {
  const { draggingData, draggingElement } = useDragMaskStore();

  return (
    <Overlay active={!draggingData?.isRight && !!draggingElement}>
      <span>Drop here to add</span>
    </Overlay>
  );
};

export default memo(BoardOverlay);
