import { create } from 'zustand';
import { v4 } from 'uuid';

import { StudioDataNode } from '../types/graph';
import { DEFAULT_SHOW_CONNECT_LINE } from '../constants/default-values';

type Store = {
  entry: StudioDataNode | null;
  setEntry: (entry: StudioDataNode | null) => void;

  data: StudioDataNode[];
  setData: (data: StudioDataNode[]) => void;
  clear: () => void;

  showConnectLine?: boolean;
  setShowConnectLine: (showConnectLine: boolean) => void;
};

const useStudioDataStore = create<Store>((set) => ({
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

  showConnectLine: DEFAULT_SHOW_CONNECT_LINE,
  setShowConnectLine: (showConnectLine) => {
    set({ showConnectLine });
  },
}));

export default useStudioDataStore;
