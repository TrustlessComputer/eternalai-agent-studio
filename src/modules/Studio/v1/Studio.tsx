import { DndContext } from '@dnd-kit/core';
import { NodeTypes, ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle, useMemo } from 'react';

import '@/styles/global.scss';
import DataFlow from '../components/DataFlow';
import DragMask from '../components/DnD/DragMask';
import { FLOW_NODE_TYPES } from '../constants/keyMapper';

import useDragMaskStore from '@/modules/Studio/stores/useDragMaskStore';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioDataSourceStore from '@/modules/Studio/stores/useStudioDataSourceStore';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import MouseTracker from '../components/MouseTracker';
import { StudioCategory } from '../types/category';
import { DataSourceType } from '../types/dataSource';
import { StudioDataNode } from '../types/graph';
import { getFieldDataFromRawData } from '../utils/data';
import { transformDataToBaseNodes } from '../utils/node';
import Board from './Board';
import useStudioDnD from './hooks/useStudioDnd';
import Sidebar from './Sidebar';
import './Studio.scss';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  categories: StudioCategory[];
  onChange?: (data: StudioDataNode[]) => void;
  nodeTypes?: NodeTypes;
  dataSource?: Record<string, DataSourceType[]>;
};

export type StudioRef = {
  setData: (data: StudioDataNode[]) => void;
};

const StudioComponent = ({ className, categories, onChange, nodeTypes, dataSource, ...rest }: StudioProps) => {
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

  useEffect(() => {
    if (dataSource) {
      useStudioDataSourceStore.getState().setDataSource(dataSource);
    }
  }, [dataSource]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DataFlow onChange={onChange} />

      <div className={cx('studio', className)} {...rest}>
        <DragMask />

        <div className="studio__left">
          <Sidebar />
        </div>

        <MouseTracker className="studio__right">
          <Board nodeTypes={extendedNodeTypes} />
        </MouseTracker>
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
        // clear current nodes/edges
        useStudioFlowStore.getState().clear();
        useStudioFormStore.getState().clear();
        useStudioDataStore.getState().clear();
        useStudioFlowViewStore.getState().clear();
        useDragMaskStore.getState().clear();

        // generate nodes/edges from data
        useStudioDataStore.getState().setData(data);

        const initNodes = transformDataToBaseNodes(data);
        console.log('studio init nodes', initNodes);
        useStudioFlowStore.getState().addNodes(initNodes);

        const formData = getFieldDataFromRawData(data);
        console.log('studio init form datas', formData);
        useStudioFormStore.getState().initDataForms(formData);
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
