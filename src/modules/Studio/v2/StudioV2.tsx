import { NodeTypes, ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle, useMemo } from 'react';

import '../../styles/global.scss';
import DataFlow from '../components/DataFlow';
import { FLOW_NODE_TYPES } from '../constants/keyMapper';

import useDragMaskStore from '../stores/useDragMaskStore';
import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import useStudioDataSourceStore from '../stores/useStudioDataSourceStore';
import useStudioDataStore from '../stores/useStudioDataStore';
import useStudioFlowStore from '../stores/useStudioFlowStore';
import useStudioFlowViewStore from '../stores/useStudioFlowViewStore';
import useStudioFormStore from '../stores/useStudioFormStore';
import { StudioCategory } from '../types/category';
import { DataSourceType } from '../types/dataSource';
import { StudioDataNode } from '../types/graph';
import { getFieldDataFromRawData } from '../utils/data';
import { transformDataToNodes } from '../utils/node';
import './StudioV2.scss';

export type StudioV2Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  categories: StudioCategory[];
  onChange?: (data: StudioDataNode[]) => void;
  nodeTypes?: NodeTypes;
  dataSource?: Record<string, DataSourceType[]>;
};

export type StudioV2Ref = {
  setData: (data: StudioDataNode[]) => void;
};

const StudioComponent = ({ className, categories, onChange, nodeTypes, dataSource, ...rest }: StudioV2Props) => {
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
    <>
      <DataFlow onChange={onChange} />

      <div className={cx('studio', className)} {...rest} />
    </>
  );
};

export const StudioV2 = React.forwardRef<StudioV2Ref, StudioV2Props>((props: StudioV2Props, ref) => {
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
