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
import { transformDataToNodes } from './utils/node';

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
        // clear current nodes/edges
        useStudioFlowStore.getState().clear();

        useStudioDataStore.getState().setData(data);

        const initNodes = transformDataToNodes(data);
        console.log('studio init nodes', initNodes);
        useStudioFlowStore.getState().addNodes(initNodes);
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
