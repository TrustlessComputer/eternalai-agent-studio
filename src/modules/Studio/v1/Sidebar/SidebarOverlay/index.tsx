import Overlay from '@/modules/Studio/components/Overlay';
import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import { memo } from 'react';

const SidebarOverlay = () => {
  const draggingData = useDragMaskStore((state) => state.draggingData);

  return (
    <Overlay active={!!draggingData?.isRight}>
      <span>Drop here to remove</span>
    </Overlay>
  );
};

export default memo(SidebarOverlay);
