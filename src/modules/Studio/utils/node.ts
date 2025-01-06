import { XYPosition } from '@xyflow/react';

import { AREA_CLASS_NAMES } from '../constants/area-class-names';
import { StudioDataNode, StudioNode, StudioNodeMetadata } from '../types/graph';

import { NodeType } from '@/enums/node-type';

/**
 * Creates configuration for a new base node
 * @param {string} id - Unique node identifier
 * @param {XYPosition} position - Node position coordinates
 * @param {StudioNodeMetadata} metadata - Node metadata
 * @returns {StudioNode} New node configuration
 */
export const createNewNodeBase = (id: string, position: XYPosition, metadata: StudioNodeMetadata): StudioNode => {
  return {
    id,
    type: NodeType.NODE_BASE,
    position,
    data: {
      sourceHandles: [],
      targetHandles: [],
      id,
      metadata,
    },
    dragHandle: `.${AREA_CLASS_NAMES.DRAG_HANDLE}`,
  } satisfies StudioNode;
};

export const transformDataToNodes = (data: StudioDataNode[]) => {
  const nodes: StudioNode[] = [];

  data.forEach((item) => {
    if (item.idx) {
      const position = item.rect?.position || { x: 0, y: 0 };

      const childrenNode: StudioNode[] = [];
      if (item.children.length) {
        childrenNode.push(...transformDataToNodes(item.children));
      }

      const metadata = {
        children: childrenNode,
        idx: item.idx,
      } satisfies StudioNodeMetadata;

      nodes.push(createNewNodeBase(item.id, position, metadata));
    }
  });

  return nodes;
};
