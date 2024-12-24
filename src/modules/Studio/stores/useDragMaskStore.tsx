import { create } from 'zustand';

import { StudioNode } from '../types/graph';

type State = {
  draggingNode: StudioNode | null;
  dragNode: (node: StudioNode) => void;
  dropNode: () => void;
};

const useDragMaskStore = create<State>((set) => ({
  draggingNode: null,

  dragNode: (node) => set({ draggingNode: node }),
  dropNode: () => set({ draggingNode: null }),
}));

export default useDragMaskStore;
