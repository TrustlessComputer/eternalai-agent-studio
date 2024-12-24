import { create } from 'zustand';
import { v4 } from 'uuid';

import { StudioDataNode } from '../types/graph';

type State = {
  data: StudioDataNode[];
  setData: (data: StudioDataNode[]) => void;
  getDataById: (id: string) => StudioDataNode | undefined;
};

const useStudioDataStore = create<State>((set, get) => ({
  data: [],
  setData: (data) => {
    const latestData = get().data;
    const processingData = (data || [])
      .map((item) => {
        if (item.id) {
          return item;
        }
        const existingItem = latestData.find((latestItem) => latestItem.id === item.id);
        if (existingItem) {
          return {
            ...item,
            id: existingItem.id,
            order: item.order ?? Number.MAX_SAFE_INTEGER,
          };
        }

        return {
          ...item,
          id: v4(),
          order: item.order ?? Number.MAX_SAFE_INTEGER,
        };
      })
      .sort((a, b) => (a.order || Number.MAX_SAFE_INTEGER) - (b.order || Number.MAX_SAFE_INTEGER));
    set({ data: processingData });
  },
  getDataById: (id) => get().data.find((item) => item.id === id),
}));

export default useStudioDataStore;
