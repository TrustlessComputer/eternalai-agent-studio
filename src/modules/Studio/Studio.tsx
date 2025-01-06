import '../../styles/global.scss';
import './Studio.scss';

import { ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import React, { useEffect, useImperativeHandle } from 'react';

import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DndFlow from './components/DnD/DndFlow';
import DragMask from './components/DnD/DragMask';
import EventHandler from './components/EventHandler';
import Sidebar from './components/Sidebar';
import { MIN_THROTTLE_DATA_DELAY, MIN_THROTTLE_NODES_DELAY } from './constants/configs';
import {
  DEFAULT_BOARD_CONFIG,
  DEFAULT_THROTTLE_DATA_DELAY,
  DEFAULT_THROTTLE_NODES_DELAY,
} from './constants/default-values';
import { SidebarSide } from './enums/side';
import { useStudio } from './hooks/useStudio';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataSourceStore from './stores/useStudioDataSourceStore';
import useStudioDataStore from './stores/useStudioDataStore';
import { DataSource, FormDataMap, StudioCategory, StudioDataNode } from './types';
import { BoardConfig } from './types/config';
import { min } from './utils/data';

export type StudioProps = {
  className?: string;

  // Data
  categories: StudioCategory[];
  dataSource?: Record<string, DataSource[]>;
  data: StudioDataNode[];

  // Configs
  sidebarSide?: SidebarSide;
  boardConfig?: BoardConfig;

  throttleNodesDelay?: number;
  throttleDataDelay?: number;

  // Events
  onChange?: (data: StudioDataNode[]) => void;
};

export type StudioRef = {
  cleanup: () => void;
  redraw: (data: StudioDataNode[]) => void;
  getOptionPlaceQuantity: (optionId: string) => number;
  checkOptionIsPlaced: (optionId: string) => boolean;
  getFormDataById: (id: string) => FormDataMap | undefined;
};

const StudioComponent = ({
  className,
  categories,
  dataSource,
  data,
  boardConfig = DEFAULT_BOARD_CONFIG,
  sidebarSide = SidebarSide.LEFT,
  throttleNodesDelay = DEFAULT_THROTTLE_NODES_DELAY,
  throttleDataDelay = DEFAULT_THROTTLE_DATA_DELAY,
  onChange,
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
    useStudioDataStore.getState().setDisabledConnection(!!boardConfig.disabledConnection);
  }, [boardConfig.disabledConnection]);

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
      <DataFlow
        throttleNodesDelay={min(throttleNodesDelay, MIN_THROTTLE_NODES_DELAY)}
        throttleDataDelay={min(throttleDataDelay, MIN_THROTTLE_DATA_DELAY)}
        onChange={onChange}
      />

      <div
        className={cx('studio', sidebarSide === SidebarSide.LEFT ? 'studio--left' : 'studio--right', className)}
        {...rest}
      >
        <DragMask />

        <div className="studio__sidebar">
          <Sidebar sidebarSide={sidebarSide} />
        </div>

        <EventHandler className="studio__board">
          <Board boardConfig={boardConfig} />
        </EventHandler>
      </div>
    </DndFlow>
  );
};

export const Studio = React.forwardRef<StudioRef, StudioProps>((props: StudioProps, ref) => {
  const { redraw, cleanup, getOptionPlaceQuantity, checkOptionIsPlaced, getFormDataById } = useStudio();

  useImperativeHandle(
    ref,
    () => ({
      cleanup: () => {
        cleanup();
      },
      redraw: (data: StudioDataNode[]) => {
        redraw(data);
      },
      getOptionPlaceQuantity: (optionId: string) => {
        return getOptionPlaceQuantity(optionId);
      },
      checkOptionIsPlaced: (optionId: string) => {
        return checkOptionIsPlaced(optionId);
      },
      getFormDataById: (id: string) => {
        return getFormDataById(id);
      },
    }),
    [cleanup, redraw, getOptionPlaceQuantity, checkOptionIsPlaced, getFormDataById],
  );

  return (
    <ReactFlowProvider>
      <StudioComponent {...props} />
    </ReactFlowProvider>
  );
});
