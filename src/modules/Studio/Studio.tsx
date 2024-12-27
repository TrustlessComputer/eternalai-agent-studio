import { NodeTypes, ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle, useMemo } from 'react';

import '../../styles/global.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/DragMask';
import Sidebar from './components/Sidebar';
import { FLOW_NODE_TYPES } from './constants/keyMapper';

import DnDContainer from './components/DnD/DnDContainer';
import EventHandler from './components/EventHandler';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataSourceStore from './stores/useStudioDataSourceStore';
import useStudioDataStore from './stores/useStudioDataStore';
import useStudioDndStore from './stores/useStudioDndStore';
import useStudioFlowStore from './stores/useStudioFlowStore';
import useStudioFlowViewStore from './stores/useStudioFlowViewStore';
import useStudioFormStore from './stores/useStudioFormStore';
import './Studio.scss';
import { StudioCategory } from './types/category';
import { DataSourceType } from './types/dataSource';
import { StudioDataNode } from './types/graph';
import { getFieldDataFromRawData } from './utils/data';
import { transformDataToNodes } from './utils/node';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  categories: StudioCategory[];
  onChange?: (data: StudioDataNode[]) => void;
  dataSource?: Record<string, DataSourceType[]>;
};

export type StudioRef = {
  setData: (data: StudioDataNode[]) => void;
};

const StudioComponent = ({ className, categories, onChange, dataSource, ...rest }: StudioProps) => {
  const extendedNodeTypes = useMemo(() => {
    return {
      ...FLOW_NODE_TYPES,
    };
  }, []);

  useEffect(() => {
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (dataSource) {
      useStudioDataSourceStore.getState().setDataSource(dataSource);
    }
  }, [dataSource]);

  return (
    <DnDContainer>
      <DataFlow onChange={onChange} />

      <div className={cx('studio', className)} {...rest}>
        <DragMask />

        <div className="studio__left">
          <Sidebar />
        </div>

        <EventHandler className="studio__right">
          <Board nodeTypes={extendedNodeTypes} />
        </EventHandler>
      </div>
    </DnDContainer>
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
        useStudioDndStore.getState().clear();

        // generate nodes/edges from data
        useStudioDataStore.getState().setData(data);

        const initNodes = transformDataToNodes(data);
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
