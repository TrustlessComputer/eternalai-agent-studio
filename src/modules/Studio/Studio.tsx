import { DndContext } from '@dnd-kit/core';
import { NodeTypes, ReactFlowProvider, XYPosition } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle, useMemo } from 'react';

import '../../styles/global.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/DragMask';
import Sidebar from './components/Sidebar';
import { FLOW_NODE_TYPES } from './constants/keyMapper';

import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataStore from './stores/useStudioDataStore';
import './Studio.scss';
import { StudioCategory } from './types/category';
import { StudioDataNode, StudioNode } from './types/graph';
import EventHandler from './components/EventHandler';
import useStudioDnD from './hooks/useStudioDnd';
import useStudioFlowStore from './stores/useStudioFlowStore';
import { NodeType } from '@/enums/node-type';
import { AreaClassName } from './constants/area-class-name';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  categories: StudioCategory[];
  onChange?: (data: StudioDataNode[]) => void;
  nodeTypes?: NodeTypes;
};

export type StudioRef = {
  setData: (data: StudioDataNode[]) => void;
};

const StudioComponent = ({ className, categories, onChange, nodeTypes, ...rest }: StudioProps) => {
  const { sensors, handleDragStart, handleDragEnd } = useStudioDnD();

  const extendedNodeTypes = useMemo(() => {
    return {
      ...FLOW_NODE_TYPES,
      ...nodeTypes,
    };
  }, [nodeTypes]);

  useEffect(() => {
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DataFlow onChange={onChange} />

      <div className={cx('studio', className)} {...rest}>
        <DragMask />

        <div className="studio_left">
          <Sidebar />
        </div>

        <EventHandler className="studio_right">
          <Board nodeTypes={extendedNodeTypes} />
        </EventHandler>
      </div>
    </DndContext>
  );
};

export const Studio = React.forwardRef<StudioRef, StudioProps>((props: StudioProps, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      setData: (data: StudioDataNode[]) => {
        console.log('studio init data', data);
        // generate nodes/edges from data
        useStudioDataStore.getState().setData(data);

        const newNodes: StudioNode[] = [];
        // data.forEach((item) => {
        //   const position = (item.rect?.position || {}) as XYPosition;
        //   newNodes.push({
        //     id: item.id,
        //     type: NodeType.BASE_NODE,
        //     position,
        //     data: {
        //       sourceHandles: [],
        //       targetHandles: [],
        //       metadata: {
        //         // ...active,
        //         nodeId: item.id,
        //         // category: thisCategory,
        //         // option: thisOption,
        //         children: [],
        //       },
        //     },
        //     dragHandle: `.${AreaClassName.DRAG_HANDLE}`,
        //   });
        // });
        // useStudioFlowStore.getState().addNode({
        //   id: nodeId,
        //   // type: active.data.current?.nodeType,
        //   type: NodeType.BASE_NODE,
        //   position: { x: transformedX, y: transformedY },
        //   data: {
        //     sourceHandles: [],
        //     targetHandles: [],
        //     metadata: {
        //       ...active,
        //       nodeId,
        //       category: thisCategory,
        //       option: thisOption,
        //       children: [],
        //     },
        //   },
        //   dragHandle: `.${AreaClassName.DRAG_HANDLE}`,
        //   // deletable: false,
        // });
      },
    }),
    [],
  );

  return (
    <ReactFlowProvider>
      <StudioComponent {...props} />
    </ReactFlowProvider>
  );
});
