import { create } from 'zustand';
import { ReactNode } from 'react';
import { DraggableDataType } from '../types/dnd';

type State = {
  draggingElement: ReactNode | null;

  draggingData: DraggableDataType | null;

  setDragging: (node: ReactNode | null | undefined, data: DraggableDataType | null | undefined) => void;

  clear: () => void;
};

const useStudioDndStore = create<State>((set) => ({
  draggingElement: null,

  draggingData: null,

  setDragging: (node, data) => {
    set({ draggingElement: node, draggingData: data });
  },

  clear: () => {
    set({ draggingElement: null, draggingData: null });
  },
}));

export default useStudioDndStore;
