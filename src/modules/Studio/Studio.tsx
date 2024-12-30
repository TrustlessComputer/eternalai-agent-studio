import { ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle } from 'react';

import '../../styles/global.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/DragMask';
import Sidebar from './components/Sidebar';

import DnDContainer from './components/DnD/DnDContainer';
import EventHandler from './components/EventHandler';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataSourceStore from './stores/useStudioDataSourceStore';
import './Studio.scss';
import { StudioCategory } from './types/category';
import { DataSourceType } from './types/dataSource';
import { StudioDataNode } from './types/graph';
import { useStudioAgent } from './hooks/useStudioAgent';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  data: StudioDataNode[];
  categories: StudioCategory[];
  onChange?: (data: StudioDataNode[]) => void;
  dataSource?: Record<string, DataSourceType[]>;
};

export type StudioRef = {
  cleanup: () => void;
  redraw: (data: StudioDataNode[]) => void;
};

const StudioComponent = ({ data, className, categories, onChange, dataSource, ...rest }: StudioProps) => {
  const { redraw } = useStudioAgent();

  useEffect(() => {
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (dataSource) {
      useStudioDataSourceStore.getState().setDataSource(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    if (data.length) {
      redraw(data);
    }
  }, []);

  return (
    <DnDContainer>
      <DataFlow onChange={onChange} />

      <div className={cx('studio', className)} {...rest}>
        <DragMask />

        <div className="studio__left">
          <Sidebar />
        </div>

        <EventHandler className="studio__right">
          <Board />
        </EventHandler>
      </div>
    </DnDContainer>
  );
};

export const Studio = React.forwardRef<StudioRef, StudioProps>((props: StudioProps, ref) => {
  const { redraw, cleanup } = useStudioAgent();
  useImperativeHandle(
    ref,
    () => ({
      cleanup: () => {
        cleanup();
      },
      redraw: (data: StudioDataNode[]) => {
        redraw(data);
      },
    }),
    [cleanup, redraw],
  );

  return (
    <ReactFlowProvider>
      <StudioComponent {...props} />
    </ReactFlowProvider>
  );
});
