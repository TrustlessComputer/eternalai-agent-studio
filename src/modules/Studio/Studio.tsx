import { ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle } from 'react';

import '../../styles/global.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/DragMask';
import Sidebar from './components/Sidebar';

import DndFlow from './components/DnD/DndFlow';
import EventHandler from './components/EventHandler';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataSourceStore from './stores/useStudioDataSourceStore';
import './Studio.scss';
import { StudioCategoryFromProp } from './types/category';
import { DataSourceType } from './types/dataSource';
import { StudioDataNode } from './types/graph';
import { useStudioAgent } from './hooks/useStudioAgent';
import useStudioDataStore from './stores/useStudioDataStore';
import { DEFAULT_SHOW_CONNECT_LINE } from './constants/defaultValues';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  data: StudioDataNode[];
  categories: StudioCategoryFromProp[];
  onChange?: (data: StudioDataNode[]) => void;
  dataSource?: Record<string, DataSourceType[]>;
  showConnectLine?: boolean;
};

export type StudioRef = {
  cleanup: () => void;
  redraw: (data: StudioDataNode[]) => void;
};

const StudioComponent = ({
  data,
  className,
  categories,
  onChange,
  dataSource,
  showConnectLine = DEFAULT_SHOW_CONNECT_LINE,
  ...rest
}: StudioProps): React.ReactNode => {
  const { redraw, cleanup } = useStudioAgent();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (dataSource) {
      useStudioDataSourceStore.getState().setDataSource(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    useStudioDataStore.getState().setShowConnectLine(showConnectLine);
  }, [showConnectLine]);

  useEffect(() => {
    if (data.length) {
      redraw(data);
    }

    return () => {
      cleanup();
    };
  }, []);

  return (
    <DndFlow>
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
    </DndFlow>
  );
};

export const Studio: React.FC<StudioProps> = React.forwardRef<StudioRef, StudioProps>(
  (props: StudioProps, ref): React.ReactNode => {
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
  },
);
