import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cx from 'clsx';
import { HTMLAttributes, memo, useEffect, useMemo, useRef } from 'react';

import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import { DataSchema, StudioCategory, StudioCategoryOption } from '@/modules/Studio/types/category';
import { StudioNode } from '@/modules/Studio/types/graph';
import './Draggable.scss';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import { applyNodeChanges, Node, useReactFlow } from '@xyflow/react';
import { NodeType } from '@/modules/Studio/enums/node-type';
import DragMask from '../DragMask';

export type DraggableDataType = {
  isRight?: boolean;
  isParent?: boolean;
  category: StudioCategory;
  option: StudioCategoryOption;
  data?: DataSchema;
  belongsTo?: string; // belongs to node id
  metadata?: StudioNode;
};

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  data?: DraggableDataType;
  disabled?: boolean;
};

const Draggable = ({ id, data, disabled = false, children, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
    data,
  });

  const { getIntersectingNodes } = useReactFlow();
  const draggingData = useDragMaskStore((state) => state.draggingData);

  const drag = useDragMaskStore((state) => state.drag);
  const drop = useDragMaskStore((state) => state.drop);

  const refMovingNode = useRef<StudioNode>(null);
  const refIntersectingNode = useRef<Node>(null);
  useEffect(() => {
    if (draggingData?.belongsTo && transform) {
      const nodes = useStudioFlowStore.getState().nodes;
      const movingNodeIndex = nodes.findIndex((node) => node.id === draggingData.belongsTo);
      if (movingNodeIndex > -1) {
        const movingNode = refMovingNode.current || nodes[movingNodeIndex];
        refMovingNode.current = movingNode;
        const newPosition = {
          x: movingNode.position.x + transform.x,
          y: movingNode.position.y + transform.y,
        };
        const intersection = getIntersectingNodes({
          id: movingNode.id,
        })[0];

        const updatedNode = applyNodeChanges(
          [
            {
              id: draggingData.belongsTo,
              type: 'position',
              position: newPosition,
              positionAbsolute: newPosition,
              dragging: true,
            },
          ],
          [movingNode],
        );

        useStudioFlowStore.getState().updateNode(updatedNode[0]);
        refIntersectingNode.current = intersection;
        if (intersection) {
          // highlight intersection node
        } else {
          // remove highlight
        }
      } else {
        refMovingNode.current = null;
        refIntersectingNode.current = null;
      }
    } else {
      const node = refMovingNode.current;
      const intersection = refIntersectingNode.current;
      if (node) {
        if (intersection) {
          // merge node
          const nodes = useStudioFlowStore.getState().nodes;
          const edges = useStudioFlowStore.getState().edges;
          const newNodes = nodes.filter((n) => n.id !== node.id);
          const newEdges = edges.filter((e) => e.source !== node.id && e.target !== node.id);
          const intersectionNode = newNodes.find((n) => n.id === intersection.id);
          if (intersectionNode && intersectionNode.data.type === NodeType.BASE) {
            intersectionNode.data.metadata.children = [
              // take all children from intersection node
              ...intersectionNode.data.metadata.children,
              // current node
              node,
              // flatten all children from current node
              ...node.data.metadata.children,
            ];
            useStudioFlowStore.getState().setNodes(newNodes.map((n) => ({ ...n, data: { ...n.data, className: '' } })));
            useStudioFlowStore.getState().setEdges(newEdges);
            // useStudioFlowStore.getState().reloadFlow();
          }
        } else {
          // remove node
        }
      }
      refMovingNode.current = null;
      refIntersectingNode.current = null;
    }
  }, [draggingData?.belongsTo, getIntersectingNodes, transform]);

  const style = useMemo(
    () => ({
      ...props.style,
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0 : 1,
    }),
    [transform, isDragging, props.style],
  );

  useEffect(() => {
    if (!data) return;

    if (isDragging) {
      drag(children, data);
    } else {
      drop();
    }
  }, [isDragging, children, data]);

  return (
    <>
      {/* {isDragging && <DragMask />} */}

      <div
        ref={setNodeRef}
        style={style}
        {...props}
        {...listeners}
        {...attributes}
        className={cx('draggable', { 'draggable__disabled': disabled })}
      >
        {children}
      </div>
    </>
  );
};

export default memo(Draggable);
