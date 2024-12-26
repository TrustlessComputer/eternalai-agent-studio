import { NodeTypes, ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle, useMemo } from 'react';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioDataSourceStore from '@/modules/Studio/stores/useStudioDataSourceStore';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import useStudioFlowStore from '@/modules/Studio/stores/useStudioFlowStore';
import useStudioFlowViewStore from '@/modules/Studio/stores/useStudioFlowViewStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { StudioCategory } from '@/modules/Studio/types/category';
import '@/styles/global.scss';
import DataFlow from '../components/DataFlow';
import { FLOW_NODE_TYPES } from '../constants/keyMapper';
import useDragMaskStore from '../stores/useDragMaskStore';
import { DataSourceType } from '../types/dataSource';
import { StudioDataNode } from '../types/graph';
import { getFieldDataFromRawData } from '../utils/data';
import { transformDataToNodes } from '../utils/node';
import Board from './Board';
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

      <div className={cx('studio', className)} {...rest}>
        <Board />
      </div>
    </>
  );
};

export const StudioV2 = React.forwardRef<StudioV2Ref, StudioV2Props>((props: StudioV2Props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      setData: (data: StudioDataNode[]) => {
        // clear current nodes/edges
        useStudioFlowStore.getState().clear();
        useStudioFormStore.getState().clear();
        useStudioDataStore.getState().clear();
        useStudioFlowViewStore.getState().clear();
        useDragMaskStore.getState().clear();

        // generate nodes/edges from data
        useStudioDataStore.getState().setData(data);

        const initNodes = transformDataToNodes(data);
        useStudioFlowStore.getState().addNodes(initNodes);

        const formData = getFieldDataFromRawData(data);
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
