import { create } from 'zustand';

import { ReactNode } from 'react';

type State = {
  draggingCategoryItem: ReactNode | null;
  dragCategoryItem: (node: ReactNode) => void;
  dropCategoryItem: () => void;
};

const useDragMaskStore = create<State>((set) => ({
  draggingCategoryItem: null,

  dragCategoryItem: (node) => set({ draggingCategoryItem: node }),
  dropCategoryItem: () => set({ draggingCategoryItem: null }),
}));

export default useDragMaskStore;
