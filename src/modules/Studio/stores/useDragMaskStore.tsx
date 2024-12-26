import { ReactNode } from 'react';
import { create } from 'zustand';
import { Node } from '@xyflow/react';
import { DraggableDataType } from '../components/DnD/Draggable';

type State = {
  highlightingNode: Node | null;
  draggingElement: ReactNode | null;
  draggingData: DraggableDataType | null;

  setHighlightingNode: (node: Node | null) => void;

  drag: (node: ReactNode, data: DraggableDataType) => void;
  drop: () => void;

  clear: () => void;
};

const useDragMaskStore = create<State>((set) => ({
  highlightingNode: null,
  draggingElement: null,
  draggingData: null,

  setHighlightingNode: (node: Node | null) => set({ highlightingNode: node }),

  drag: (node, data) => set({ draggingElement: node, draggingData: data }),
  drop: () => set({ draggingElement: null, draggingData: null }),

  clear: () => {
    set({ draggingElement: null, draggingData: null });
  },
}));

export default useDragMaskStore;
