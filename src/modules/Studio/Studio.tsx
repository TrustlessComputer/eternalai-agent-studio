import '../../styles/global.scss';
import './Studio.scss';

import cx from 'clsx';
import { ReactFlowProvider } from '@xyflow/react';
import React, { useEffect, useImperativeHandle } from 'react';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DndFlow from './components/DnD/DndFlow';
import DragMask from './components/DnD/DragMask';
import EventHandler from './components/EventHandler';
import Sidebar from './components/Sidebar';
import { DEFAULT_SHOW_CONNECT_LINE } from './constants/default-values';
import { useStudio } from './hooks/useStudio';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataSourceStore from './stores/useStudioDataSourceStore';
import useStudioDataStore from './stores/useStudioDataStore';
import { StudioDataNode, StudioCategory, DataSource } from './types';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  data: StudioDataNode[];
  categories: StudioCategory[];
  dataSource?: Record<string, DataSource[]>;
  showConnectLine?: boolean;
  onChange?: (data: StudioDataNode[]) => void;
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
  const { redraw, cleanup } = useStudio();

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
    const { redraw, cleanup } = useStudio();

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
