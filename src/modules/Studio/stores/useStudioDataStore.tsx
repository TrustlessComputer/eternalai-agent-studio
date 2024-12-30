import { create } from 'zustand';
import { v4 } from 'uuid';

import { StudioDataNode } from '../types/graph';

type State = {
  entry: StudioDataNode | null;
  setEntry: (entry: StudioDataNode | null) => void;

  data: StudioDataNode[];
  setData: (data: StudioDataNode[]) => void;
  clear: () => void;
};

const useStudioDataStore = create<State>((set) => ({
  entry: null,
  setEntry: (entry) => {
    set({ entry });
  },

  data: [],
  setData: (data) => {
    const processingData = (data || []).map((item) => {
      if (item.id) {
        return item;
      }

      return {
        ...item,
        id: v4(),
      };
    });
    set({ data: processingData });
  },
  clear: () => {
    set({ data: [], entry: null });
  },
}));

export default useStudioDataStore;
