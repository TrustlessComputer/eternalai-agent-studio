import { ReactNode } from 'react';
import { create } from 'zustand';

import { DraggableData } from '../types/dnd';
import { DomRect } from '../types/ui';
import { XYPosition } from '@xyflow/react';

const DEFAULT_VALUE = {
  draggingElement: null,
  draggingData: null,
  draggingPoint: null,
  draggingPosition: null,
};

type Store = {
  draggingElement: ReactNode | null;
  draggingData: DraggableData | null;
  draggingPoint: DomRect | null; // touching point of dragging element
  draggingPosition: XYPosition | null;

  setDragging: (node?: ReactNode | null, data?: DraggableData | null, point?: DomRect | null) => void;

  setDraggingPosition: (position: XYPosition | null) => void;

  clear: () => void;
};

const useStudioDndStore = create<Store>((set) => ({
  ...DEFAULT_VALUE,

  setDragging: (node, data, point) => {
    set({ draggingElement: node, draggingData: data, draggingPoint: point });
  },

  setDraggingPosition: (position) => {
    set({ draggingPosition: position });
  },

  clear: () => {
    set(DEFAULT_VALUE);
  },
}));

export default useStudioDndStore;
