import { DndContext } from '@dnd-kit/core';
import { ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import { FC, useEffect } from 'react';
import './Studio.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import Sidebar from './components/Sidebar';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataStore from './stores/useStudioDataStore';
import { StudioCategory } from './types/category';
import { StudioDataNode } from './types/graph';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  categories: StudioCategory[];
  data: StudioDataNode[];
  onChange?: (data: StudioDataNode[]) => void;
};

export const Studio: FC<StudioProps> = ({ className, data, categories, onChange, ...rest }) => {
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
