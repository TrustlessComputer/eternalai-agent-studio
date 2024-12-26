import { NodeType } from '@/enums/node-type';
import { Active, DataRef } from '@dnd-kit/core';
import { XYPosition } from '@xyflow/react';
import { RefObject } from 'react';
import { AreaClassName } from '../constants/area-class-name';
import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { StudioCategoryMap } from '../types/category';
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
  const mapCategories = useStudioCategoryStore.getState().mapCategories;

  data.forEach((item) => {
    if (item.keyMapper) {
      const option = mapCategories[item.keyMapper] as StudioCategoryMap;
      const category = option.parent;

      const position = item.rect?.position || { x: 0, y: 0 };

      const active = {
        data: {
          current: {
            data: option.data,
          },
        } as DataRef,
        rect: {} as RefObject<{
          initial: ClientRect | null;
          translated: ClientRect | null;
        }>,
      } as Active;

      const childrenNode: StudioNode[] = [];
      if (item.children.length) {
        childrenNode.push(...transformDataToNodes(item.children));
      }

      const metadata = {
        ...active,
        nodeId: item.id,
        category,
        option,
        children: childrenNode,
      } satisfies StudioNodeMetadata;

      nodes.push(createNewBaseNode(item.id, position, metadata));
    }
  });

  return nodes;
};
