import { HTMLAttributes, memo, useCallback, useMemo } from 'react';

import Draggable from '../base/Draggable';

import { DomRect } from '@/modules/index';
import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DraggableData, StudioZone } from '@/modules/Studio/types/dnd';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableData, 'type'>;
  disabled?: boolean;
  draggingFloating?: React.ReactNode;
};

const Product = ({ id, data, disabled = false, children, draggingFloating, ...props }: Props) => {
  const extendedData = useMemo(() => {
    return {
      ...data,
      type: StudioZone.ZONE_PRODUCT,
    } satisfies DraggableData;
  }, [data]);

  const handleOnDrag = useCallback(
    (data: DraggableData, touchingPoint: DomRect | null) => {
      if (draggingFloating) {
        useStudioDndStore.getState().setDragging(draggingFloating, extendedData, touchingPoint);
      } else {
        useStudioDndStore.getState().setDragging(children, extendedData, touchingPoint);
      }
    },
    [extendedData, draggingFloating],
  );

  const handleOnDrop = useCallback((data: DraggableData) => {
    useStudioDndStore.getState().setDragging();
  }, []);

  return (
    <Draggable
      {...props}
      id={id}
      data={extendedData}
      disabled={disabled}
      handleOnDrag={handleOnDrag}
      handleOnDrop={handleOnDrop}
    >
      {children}
    </Draggable>
  );
};

export default memo(Product);
