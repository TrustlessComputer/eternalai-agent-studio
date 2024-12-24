import { create } from 'zustand';
import { v4 } from 'uuid';

import { StudioCategory } from '../types/category';

type State = {
  data: StudioCategory[];
  setData: (data: StudioCategory[]) => void;
  getDataById: (id: string) => StudioCategory | undefined;
};

const useStudioDataStore = create<State>((set, get) => ({
  data: [],
  setData: (data) => {
    const latestData = get().data;
    const processingData = data
      .map((item) => {
        if (item.id) {
          return item;
        }
        const existingItem = latestData.find((latestItem) => latestItem.id === item.id);
        if (existingItem) {
          return {
            ...item,
            id: existingItem.id,
          };
        }

        return {
          ...item,
          id: v4(),
        };
      })
      .sort((a, b) => a.order - b.order);
    set({ data: processingData });
  },
  getDataById: (id) => get().data.find((item) => item.id === id),
}));

export default useStudioDataStore;
