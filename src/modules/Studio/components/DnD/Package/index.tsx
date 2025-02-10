import { useDroppable } from '@dnd-kit/core';
import React, { useMemo } from 'react';

import { DraggableData, StudioZone } from '@/modules/Studio/types/dnd';

import './Package.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableData, 'type'>;
  disabled?: boolean; // means the droppable do not accept any droppable
  style?: React.CSSProperties;
};

const Package = ({ id, data, disabled, children, style, ...props }: Props) => {
  const extendedData = useMemo(() => {
    return {
      ...data,
      type: StudioZone.ZONE_PACKAGE,
    } satisfies DraggableData;
  }, [data]);

  const { setNodeRef } = useDroppable({
    id,
    data: extendedData,
    disabled,
  });

  return (
    <div ref={setNodeRef} id={`node-base-${data.belongsTo}`} style={style} {...props}>
      {children}
    </div>
  );
};

export default Package;
