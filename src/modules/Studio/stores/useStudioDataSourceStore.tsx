import { create } from 'zustand';

import { DataSourceType } from '../types/dataSource';

interface State {
  dataSource: Record<string, DataSourceType[]>;
  setDataSource: (data: Record<string, DataSourceType[]>) => void;
}

const useStudioDataSourceStore = create<State>((set, get) => ({
  dataSource: {},
  setDataSource: (data) => {
    set({
      dataSource: {
        ...get().dataSource,
        ...data,
      },
    });
  },
}));

export default useStudioDataSourceStore;
