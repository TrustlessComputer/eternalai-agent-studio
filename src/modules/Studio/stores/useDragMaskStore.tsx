import { ReactNode } from 'react';
import { create } from 'zustand';
import { DraggableDataType } from '../components/DnD/Draggable';

type State = {
  draggingElement: ReactNode | null;
  draggingData: DraggableDataType | null;

  drag: (node: ReactNode, data: DraggableDataType) => void;
  drop: () => void;

  clear: () => void;
};

const useDragMaskStore = create<State>((set) => ({
  draggingElement: null,
  draggingData: null,

  drag: (node, data) => set({ draggingElement: node, draggingData: data }),
  drop: () => set({ draggingElement: null, draggingData: null }),

  clear: () => {
    set({ draggingElement: null, draggingData: null });
  },
}));

export default useDragMaskStore;
