import { create } from 'zustand';
import { v4 } from 'uuid';

import { StudioDataNode } from '../types/graph';

type State = {
  data: StudioDataNode[];
  setData: (data: StudioDataNode[]) => void;
};

const useStudioDataStore = create<State>((set, get) => ({
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
}));

export default useStudioDataStore;
