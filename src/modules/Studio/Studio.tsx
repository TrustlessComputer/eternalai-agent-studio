import { DndContext } from '@dnd-kit/core';
import { NodeTypes } from '@xyflow/react';
import cx from 'clsx';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import '../../styles/global.scss';
import Board from './components/Board';
import DataFlow from './components/DataFlow';
import DragMask from './components/DnD/DragMask';
import Sidebar from './components/Sidebar';
import { FLOW_NODE_TYPES } from './constants/keyMapper';
import useContainerMouse from './hooks/useContainerMouse';
import useStudioDnD from './hooks/useStudioDnd';
import useStudioCategoryStore from './stores/useStudioCategoryStore';
import useStudioDataStore from './stores/useStudioDataStore';
import useStudioFlowViewStore from './stores/useStudioFlowViewStore';
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
  const rightContentRef = useRef<HTMLDivElement>(null);

  const { sensors, handleDragStart, handleDragEnd } = useStudioDnD();

  const setMousePosition = useStudioFlowViewStore((state) => state.setMousePosition);

  const handleOnTick = useCallback(
    (
      contentRect: DOMRect,
      mousePosition: { x: number; y: number },
      previousMousePosition: { x: number; y: number },
    ) => {
      setMousePosition(mousePosition);
    },
    [],
  );

  const { addListeners, removeListeners } = useContainerMouse({
    ref: rightContentRef,
    handleOnTick,
  });

  const extendedNodeTypes = useMemo(() => {
    return {
      ...FLOW_NODE_TYPES,
      ...nodeTypes,
    };
  }, [nodeTypes]);

  useEffect(() => {
    useStudioCategoryStore.getState().setCategories(categories);
  }, [categories]);

  useEffect(() => {
    useStudioDataStore.getState().setData(data);
  }, [data]);

  useEffect(() => {
    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DataFlow onChange={onChange} />

      <div className={cx('studio', className)} {...rest}>
        <DragMask />

        <div className="studio_left">
          <Sidebar />
        </div>

        <div className="studio_right" ref={rightContentRef}>
          <Board nodeTypes={extendedNodeTypes} />
        </div>
      </div>
    </DndContext>
  );
};
