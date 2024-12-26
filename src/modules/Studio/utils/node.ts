import { NodeType } from '@/modules/Studio/enums/node-type';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { BaseNodeMetadata, StudioDataNode, StudioNode } from '@/modules/Studio/types/graph';
import { Active, DataRef } from '@dnd-kit/core';
import { XYPosition } from '@xyflow/react';
import { RefObject } from 'react';
import { AreaClassName } from '../constants/area-class-name';

export const createNewPieceNode = (id: string, position: XYPosition, metadata: BaseNodeMetadata) => {
  return {
    id,
    type: NodeType.BASE,
    position,
    data: {
      type: NodeType.BASE,
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
      } satisfies BaseNodeMetadata;

      nodes.push(createNewPieceNode(item.id, position, metadata));
    }
  });

  return nodes;
};
