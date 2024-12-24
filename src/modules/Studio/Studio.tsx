import { DndContext } from '@dnd-kit/core';
import { ReactFlowProvider } from '@xyflow/react';
import cx from 'clsx';
import { useEffect } from 'react';

import '../../styles/global.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/DragMask';
import Sidebar from './components/Sidebar';
import useStudioDnD from './hooks/useStudioDnd';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataStore from './stores/useStudioDataStore';
import './Studio.scss';
import { StudioCategory } from './types/category';
import { StudioDataNode } from './types/graph';

export type StudioProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  categories: StudioCategory[];
  data: StudioDataNode[];
  onChange?: (data: StudioDataNode[]) => void;
};

export const Studio: React.FC<StudioProps> = ({ className, data, categories, onChange, ...rest }) => {
  const { sensors, handleDragStart, handleDragEnd } = useStudioDnD();

  useEffect(() => {
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  useEffect(() => {
    useStudioDataStore.getState().setData(data);
  }, [data]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DataFlow onChange={onChange} />

      <ReactFlowProvider>
        <div className={cx('studio', className)} {...rest}>
          <DragMask />

          <div className="studio_left">
            <Sidebar />
          </div>

          <div className="studio_right">
            <Board />
          </div>
        </div>
      </ReactFlowProvider>
    </DndContext>
  );
};
