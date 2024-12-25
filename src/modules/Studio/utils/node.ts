import { NodeType } from '@/enums/node-type';
import { XYPosition } from '@xyflow/react';
import { AreaClassName } from '../constants/area-class-name';
import { StudioDataNode, StudioNode, StudioNodeMetadata } from '../types/graph';

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

export const transformDataToNodes = (data: StudioDataNode[]) => {
  const nodes: StudioNode[] = [];
  data.forEach((item) => {
    nodes.push(createNewBaseNode(item.id, item.rect?.position || { x: 0, y: 0 }, {} as StudioNodeMetadata));
    if (item.children.length) {
      nodes.push(...transformDataToNodes(item.children));
    }
  });

  return nodes;
};
