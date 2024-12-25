import { NodeType } from '@/enums/node-type';
import { XYPosition } from '@xyflow/react';
import { AreaClassName } from '../constants/area-class-name';
import { StudioNode, StudioNodeMetadata } from '../types/graph';

export const createNewBaseNode = (id: string, position: XYPosition, metadata: StudioNodeMetadata) => {
  return {
    id,
    type: NodeType.BASE_NODE,
    position,
    data: {
      sourceHandles: [],
      targetHandles: [],
      metadata,
    },
    dragHandle: `.${AreaClassName.DRAG_HANDLE}`,
  } satisfies StudioNode;
};
