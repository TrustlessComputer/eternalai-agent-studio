import { memo } from 'react';

import Overlay from '../../Overlay';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { StudioZone } from '@/modules/Studio/types/dnd';

const SidebarOverlay = () => {
  const draggingData = useStudioDndStore((state) => state.draggingData);
  const draggingElement = useStudioDndStore((state) => state.draggingElement);

  return (
    <Overlay active={!!draggingData && draggingData.type === StudioZone.ZONE_PRODUCT && !!draggingElement}>
      <></>
    </Overlay>
  );
};

export default memo(SidebarOverlay);
