import { create } from 'zustand';

type Store = {
  data: Record<string, Record<string, unknown>>;
  addData: (id: string, data: Record<string, unknown>) => void;
  clear: () => void;
};

export const useMultipleStore = create<Store>((set, get) => ({
  data: {},
  addData: (id, data) => {
    const latestData = get().data;
    const newUpdated = {
      ...latestData,
      [id]: {
        ...(latestData[id] || {}),
        ...data,
      },
    };
    set({
      data: newUpdated,
    });
  },
  clear: () => {
    set({ data: {} });
  },
}));

const createNewStore = <T>(id: string, initialData?: T) => {
  useMultipleStore.getState().addData(id, initialData || {});

  return {
    dataStore: (useMultipleStore.getState().data[id] || {}) as T,
    addData: (data: Record<string, Partial<T>>) => {
      useMultipleStore.getState().addData(id, data);
    },
    addDataField: (field: string, value: unknown) => {
      useMultipleStore.getState().addData(id, {
        [field]: value,
      });
    },
  } as StoreWithAttributes<T>;
};

type StoreWithAttributes<T> = {
  dataStore: T;
  addData: (data: Partial<T>) => void;
  addDataField: (key: string, value: unknown) => void;
};

const useNewStore = <T>(id: string) => {
  const data = useMultipleStore((state) => state.data[id]) as T;

  return {
    dataStore: (data || {}) as T,
    addData: (data: Record<string, Partial<T>>) => {
      useMultipleStore.getState().addData(id, data);
    },
    addDataField: (field: string, value: unknown) => {
      useMultipleStore.getState().addData(id, {
        [field]: value,
      });
    },
  } as StoreWithAttributes<T>;
};

export { useNewStore, createNewStore };
