import { FC } from 'react';
import cx from 'clsx';
import { DndContext } from '@dnd-kit/core';
import { ReactFlowProvider } from '@xyflow/react';

import './Studio.scss';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import { StudioDataNode } from './types/graph';

export type IStudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  data: StudioDataNode[];
  onChange?: (data: StudioDataNode[]) => void;
};

export const Studio: FC<IStudioProps> = ({ className, data, onChange, ...rest }) => {
  return (
    <DndContext>
      <ReactFlowProvider>
        <div className={cx('studio', className)} {...rest}>
          <Sidebar />
          <Board />
        </div>
      </ReactFlowProvider>
    </DndContext>
  );
};
