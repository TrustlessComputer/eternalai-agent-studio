import { HTMLAttributes, memo, useCallback, useMemo } from 'react';

import Draggable from '../base/Draggable';

import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DraggableData, StudioZone } from '@/modules/Studio/types/dnd';
import { DomRect, TouchingPoint } from '@/modules/Studio/types/ui';

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableData, 'type'>;
  disabled?: boolean;
};

const Source = ({ id, data, disabled = false, children, ...props }: Props) => {
  const extendedData = useMemo(() => {
    return {
      ...data,
      type: StudioZone.ZONE_SOURCE,
    } satisfies DraggableData;
  }, [data, id]);

  const handleOnDrag = useCallback(
    (data: DraggableData, touchingPoint: DomRect | null) => {
      useStudioDndStore.getState().setDragging(children, extendedData, touchingPoint);
    },
    [extendedData],
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

export default memo(Source);
