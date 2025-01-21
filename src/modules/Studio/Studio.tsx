import '../../styles/global.scss';
import './Studio.scss';

import { ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle } from 'react';

import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/base/DragMask';
import DndFlow from './components/DnD/DndFlow';
import EventHandler from './components/EventHandler';
import Sidebar from './components/Sidebar';
import { MIN_THROTTLE_DATA_DELAY, MIN_THROTTLE_NODES_DELAY, MIN_THROTTLE_VIEW_DELAY } from './constants/configs';
import {
  DEFAULT_THROTTLE_DATA_DELAY,
  DEFAULT_THROTTLE_NODES_DELAY,
  DEFAULT_THROTTLE_VIEW_DELAY,
} from './constants/default-values';
import { SidebarSide } from './enums/side';
import { useStudio } from './hooks/useStudio';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioConfigStore from './stores/useStudioConfigStore';
import useStudioDataSourceStore from './stores/useStudioDataSourceStore';
import useStudioDataStore from './stores/useStudioDataStore';
import { DataSource, GraphData, StudioCategory } from './types';
import { StudioConfig } from './types/config';
import { min } from './utils/data';

import useStudioStore from '@/modules/Studio/stores/useStudioStore';

export type StudioProps = {
  className?: string;
  sidebarWidth?: string | number;

  // Data
  categories: StudioCategory[];
  dataSource?: Record<string, DataSource[]>;
  graphData: GraphData;

  throttleNodesDelay?: number;
  throttleDataDelay?: number;
  throttleViewDelay?: number;
  // Configs
  config?: StudioConfig;

  // Events
  onChange?: (graphData: GraphData) => void;
};

export type StudioRef = {
  cleanup: () => void;
  redraw: (graphData: GraphData) => void;
};

const StudioComponent = ({
  className,
  categories,
  dataSource,
  graphData,
  throttleNodesDelay = DEFAULT_THROTTLE_NODES_DELAY,
  throttleDataDelay = DEFAULT_THROTTLE_DATA_DELAY,
  throttleViewDelay = DEFAULT_THROTTLE_VIEW_DELAY,
  config,
  onChange,
  sidebarWidth = 400,
  ...rest
}: StudioProps): React.ReactNode => {
  const { isDrew, setIsDrew } = useStudioStore();
  const { redraw, cleanup } = useStudio();

  const sidebarSide = useStudioConfigStore((state) => state.config.sidebar.side);

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
    useStudioConfigStore.getState().setConfig(config);

    useStudioDataStore.getState().setDisabledConnection(!!config?.board.disabledConnection);
  }, [config]);

  // for mounted
  useEffect(() => {
    redraw({ data: [], viewport: { x: 0, y: 0, zoom: 1 } } satisfies GraphData);

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (!isDrew && graphData.data.length) {
      redraw(graphData);
      setIsDrew(true);
    }
  }, [graphData, graphData.data.length, isDrew, redraw]);

  return (
    <DndFlow>
      <DataFlow
        throttleNodesDelay={min(throttleNodesDelay, MIN_THROTTLE_NODES_DELAY)}
        throttleDataDelay={min(throttleDataDelay, MIN_THROTTLE_DATA_DELAY)}
        throttleViewDelay={min(throttleViewDelay, MIN_THROTTLE_VIEW_DELAY)}
        onChange={onChange}
      />

      <div
        className={cx('studio', sidebarSide === SidebarSide.LEFT ? 'studio--left' : 'studio--right', className)}
        {...rest}
      >
        <DragMask />

        <div
          className="studio__sidebar"
          style={{
            minWidth: 300,
            width: sidebarWidth,
          }}
        >
          <Sidebar />
        </div>

        <EventHandler className="studio__board">
          <Board />
        </EventHandler>
      </div>
    </DndFlow>
  );
};

export const Studio = React.forwardRef<StudioRef, StudioProps>((props: StudioProps, ref) => {
  const { redraw, cleanup } = useStudio();

  useImperativeHandle(
    ref,
    () => ({
      cleanup: () => {
        cleanup();
      },
      redraw: (graphData: GraphData) => {
        redraw(graphData);
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
