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
      id,
      metadata,
    },
    dragHandle: `.${AreaClassName.DRAG_HANDLE}`,
  } satisfies StudioNode;
};

export const transformDataToNodes = (data: StudioDataNode[]) => {
  const nodes: StudioNode[] = [];

  data.forEach((item) => {
    if (item.keyMapper) {
      const position = item.rect?.position || { x: 0, y: 0 };

      const childrenNode: StudioNode[] = [];
      if (item.children.length) {
        childrenNode.push(...transformDataToNodes(item.children));
      }

      const metadata = {
        children: childrenNode,
        keyMapper: item.keyMapper,
      } satisfies StudioNodeMetadata;

      nodes.push(createNewBaseNode(item.id, position, metadata));
    }
  });

  return nodes;
};
