import { FC } from 'react';
import cx from 'clsx';
import { DndContext } from '@dnd-kit/core';
import { ReactFlowProvider } from '@xyflow/react';

import './Studio.scss';
import Sidebar from './components/Sidebar';
import Board from './components/Board';

export type IStudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export const Studio: FC<IStudioProps> = ({ className, ...rest }) => {
  return (
    <DndContext>
      <ReactFlowProvider>
        <div className={cx('studio', className)} {...rest}>
          <div className={cx('sidebar')}>
            <Sidebar />
          </div>
          <div className={cx('board')}>
            <Board />
          </div>
        </div>
      </ReactFlowProvider>
    </DndContext>
  );
};
