import { NodeType } from '@/enums/node-type';
import { XYPosition } from '@xyflow/react';
import { AreaClassName } from '../constants/area-class-name';
import { StudioDataNode, StudioNode, StudioNodeMetadata } from '../types/graph';
import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { StudioCategory, StudioCategoryOption } from '../types/category';
import { Active, DataRef } from '@dnd-kit/core';
import { MutableRefObject } from 'react';

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
      const category = mapCategories['agent'] as StudioCategory;
      const option = mapCategories[item.keyMapper] as StudioCategoryOption;
      const position = item.rect?.position || { x: 0, y: 0 };

      const active = {
        data: {
          current: {
            data: option.data,
          },
        } as DataRef,
        rect: {} as MutableRefObject<{
          initial: ClientRect | null;
          translated: ClientRect | null;
        }>,
      } as Active;

      const metadata = {
        ...active,
        nodeId: item.id,
        category,
        option,
        children: [],
      } satisfies StudioNodeMetadata;
      nodes.push(createNewBaseNode(item.id, position, metadata));
      if (item.children.length) {
        nodes.push(...transformDataToNodes(item.children));
      }
    }
  });

  return nodes;
};
