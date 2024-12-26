import { NodeType } from '@/modules/Studio/enums/node-type';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import { StudioCategoryMap } from '@/modules/Studio/types/category';
import { BaseNodeMetadata, StudioDataNode, StudioNode } from '@/modules/Studio/types/graph';
import { Active, DataRef } from '@dnd-kit/core';
import { XYPosition } from '@xyflow/react';
import { RefObject } from 'react';
import { AreaClassName } from '../constants/area-class-name';

export const createNewBaseNode = (id: string, position: XYPosition, metadata: BaseNodeMetadata) => {
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

// export const createNewProductNode = (id: string, position: XYPosition, metadata?: ProductNodeMetadata) => {
//   return {
//     id,
//     type: NodeType.PRODUCT,
//     position,
//     data: {
//       type: NodeType.PRODUCT,
//       sourceHandles: [],
//       targetHandles: [],
//       metadata,
//     },
//     dragHandle: `.${AreaClassName.DRAG_HANDLE}`,
//   } satisfies StudioNode;
// };

export const transformDataToBaseNodes = (data: StudioDataNode[]) => {
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
        childrenNode.push(...transformDataToBaseNodes(item.children));
      }

      const metadata = {
        ...active,
        nodeId: item.id,
        category,
        option,
        children: childrenNode,
      } satisfies BaseNodeMetadata;

      nodes.push(createNewBaseNode(item.id, position, metadata));
    }
  });

  return nodes;
};

// export const transformDataToProductNodes = (data: StudioDataNode[]) => {
//   const nodes: StudioNode[] = [];

//   data.forEach((item) => {
//     const position = item.rect?.position || { x: 0, y: 0 };

//     const active = {
//       data: {
//         current: {
//           data: item.data,
//         },
//       } as DataRef,
//       rect: {} as RefObject<{
//         initial: ClientRect | null;
//         translated: ClientRect | null;
//       }>,
//     } as Active;

//     const metadata = {
//       ...active,
//       nodeId: item.id,
//     } satisfies ProductNodeMetadata;

//     nodes.push(createNewProductNode(item.id, position, metadata));
//   });

//   return nodes;
// };
