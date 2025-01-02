import { ReactNode } from 'react';
import { create } from 'zustand';
import { DraggableDataType } from '../types/dnd';
import { DomRect } from '../types/ui';

const DEFAULT_VALUE = {
  draggingElement: null,
  draggingData: null,
  draggingPoint: null,
};

type State = {
  draggingElement: ReactNode | null;
  draggingData: DraggableDataType | null;
  draggingPoint: DomRect | null; // touching point of dragging element

  setDragging: (node?: ReactNode | null, data?: DraggableDataType | null, point?: DomRect | null) => void;

  clear: () => void;
};

const useStudioDndStore = create<State>((set) => ({
  ...DEFAULT_VALUE,

  setDragging: (node, data, point) => {
    set({ draggingElement: node, draggingData: data, draggingPoint: point });
  },

  clear: () => {
    set(DEFAULT_VALUE);
  },
}));

export default useStudioDndStore;
