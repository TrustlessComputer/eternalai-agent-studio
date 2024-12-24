import { DndContext } from '@dnd-kit/core';
import { NodeTypes } from '@xyflow/react';
import cx from 'clsx';
import { useEffect, useMemo } from 'react';

import '../../styles/global.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/DragMask';
import Sidebar from './components/Sidebar';
import { FLOW_NODE_TYPES } from './constants/keyMapper';
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
  nodeTypes?: NodeTypes;
};

export const Studio: React.FC<StudioProps> = ({ className, data, categories, onChange, nodeTypes, ...rest }) => {
  const { sensors, handleDragStart, handleDragEnd } = useStudioDnD();

  useEffect(() => {
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  useEffect(() => {
    useStudioDataStore.getState().setData(data);
  }, [data]);

  const extendedNodeTypes = useMemo(() => {
    return {
      ...FLOW_NODE_TYPES,
      ...nodeTypes,
    };
  }, [nodeTypes]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DataFlow onChange={onChange} />

      <div className={cx('studio', className)} {...rest}>
        <DragMask />

        <div className="studio_left">
          <Sidebar />
        </div>

        <div className="studio_right">
          <Board nodeTypes={extendedNodeTypes} />
        </div>
      </div>
    </DndContext>
  );
};
