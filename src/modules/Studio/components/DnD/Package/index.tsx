import { useDroppable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';
// import { useReactFlow } from '@xyflow/react';
import React, { useMemo } from 'react';

// import useStudioDndStore from '@/modules/Studio/stores/useStudioDndStore';
import { DraggableData, StudioZone } from '@/modules/Studio/types/dnd';

import './Package.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  data: Omit<DraggableData, 'type'>;
  disabled?: boolean; // means the droppable do not accept any droppable
};

const Package = ({ id, data, disabled, children, ...props }: Props) => {
  // const { getZoom } = useReactFlow();
  // const draggingData = useStudioDndStore((state) => state.draggingData);
  // const transform = useStudioDndStore((state) => state.transform);

  const extendedData = useMemo(() => {
    return {
      ...data,
      type: StudioZone.ZONE_PACKAGE,
    } satisfies DraggableData;
  }, [data]);

  const { setNodeRef } = useDroppable({
    id: id + '-package',
    data: extendedData,
    disabled,
  });

  // const styles = useMemo(() => {
  //   if (transform && data.belongsTo === draggingData?.belongsTo) {
  //     const zoom = getZoom();

  //     let transformStr = CSS.Translate.toString(transform);

  //     const x = transform?.x || 0;
  //     const y = transform?.y || 0;

  //     const scaleX = transform?.scaleX || 1;
  //     const scaleY = transform?.scaleY || 1;

  //     let normalizedX = x;
  //     let normalizedY = y;

  //     if (zoom < 1) {
  //       normalizedX = (1 - zoom) * x - (zoom - 1) * x;
  //       normalizedY = (1 - zoom) * y - (zoom - 1) * y;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX,
  //         y: normalizedY,
  //         scaleX,
  //         scaleY,
  //       });
  //     } else if (zoom > 1) {
  //       normalizedX = ((1 - zoom) * x) / zoom;
  //       normalizedY = ((1 - zoom) * y) / zoom;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX,
  //         y: normalizedY,
  //         scaleX,
  //         scaleY,
  //       });
  //     } else {
  //       normalizedX = (1 - zoom) * x;
  //       normalizedY = (1 - zoom) * y;

  //       transformStr = CSS.Translate.toString({
  //         x: normalizedX,
  //         y: normalizedY,
  //         scaleX,
  //         scaleY,
  //       });
  //     }

  //     return {
  //       transform: transformStr,
  //     };
  //   }

  //   return {};
  // }, [transform, draggingData?.belongsTo, data.belongsTo, getZoom]);
  // console.log('styles', styles);

  return (
    <div
      ref={setNodeRef}
      id={`node-base-${data.belongsTo}`}
      style={{
        padding: '16px',
        // ...styles,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Package;
