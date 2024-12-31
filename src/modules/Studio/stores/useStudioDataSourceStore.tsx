import { create } from 'zustand';

import { DataSourceType } from '../types/dataSource';

interface State {
  dataSource: Record<string, DataSourceType[]>;
  setDataSource: (data: Record<string, DataSourceType[]>) => void;
}

const useStudioDataSourceStore = create<State>((set, get) => ({
  dataSource: {},
  setDataSource: (data) => {
    // processing input data
    const inputSource = Object.keys(data).reduce(
      (acc, key) => ({
        ...acc,
        [key]: data[key].map((item) => ({
          ...item,
          selectable: item.selectable ?? true,
        })),
      }),
      {},
    );
    set({
      dataSource: {
        ...get().dataSource,
        ...inputSource,
      },
    });
  },
}));

export default useStudioDataSourceStore;
