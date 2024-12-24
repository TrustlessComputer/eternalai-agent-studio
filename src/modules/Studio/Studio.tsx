import { FC, useEffect } from 'react';
import cx from 'clsx';
import { DndContext } from '@dnd-kit/core';
import { ReactFlowProvider } from '@xyflow/react';

import './Studio.scss';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import { StudioDataNode } from './types/graph';
import { StudioCategory } from './types/category';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataStore from './stores/useStudioDataStore';
import DataFlow from './components/DataFlow';

export type IStudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  categories: StudioCategory[];
  data: StudioDataNode[];
  onChange?: (data: StudioDataNode[]) => void;
};

export const Studio: FC<IStudioProps> = ({ className, data, categories, onChange, ...rest }) => {
  useEffect(() => {
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  useEffect(() => {
    useStudioDataStore.getState().setData(data);
  }, [data]);

  return (
    <DndContext>
      <DataFlow onChange={onChange} />
      <ReactFlowProvider>
        <div className={cx('studio', className)} {...rest}>
          <Sidebar />
          <Board />
        </div>
      </ReactFlowProvider>
    </DndContext>
  );
};
