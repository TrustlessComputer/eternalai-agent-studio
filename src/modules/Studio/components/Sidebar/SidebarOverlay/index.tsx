import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DndZone } from '@/modules/Studio/types/dnd';
import { memo } from 'react';
import Overlay from '../../Overlay';

const SidebarOverlay = () => {
  const { draggingData, draggingElement } = useStudioDndStore();

  return (
    <Overlay active={!!draggingData && draggingData.type === DndZone.PRODUCT && !!draggingElement}>
      <></>
    </Overlay>
  );
};

export default memo(SidebarOverlay);
