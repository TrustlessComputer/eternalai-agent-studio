import { create } from 'zustand';

import { AgentStudioNode } from '../types/flow';

type State = {
  draggingNode: AgentStudioNode | null;
  dragNode: (node: AgentStudioNode) => void;
  dropNode: () => void;
};

const useDragMaskStore = create<State>((set) => ({
  draggingNode: null,

  dragNode: (node) => set({ draggingNode: node }),
  dropNode: () => set({ draggingNode: null }),
}));

export default useDragMaskStore;
