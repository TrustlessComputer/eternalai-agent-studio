import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import { memo } from 'react';
import Overlay from '../../Overlay';

const SidebarOverlay = () => {
  const draggingData = useDragMaskStore((state) => state.draggingData);

  return (
    <Overlay active={!!draggingData?.isRight}>
      <span>Drop here to remove</span>
    </Overlay>
  );
};

export default memo(SidebarOverlay);
