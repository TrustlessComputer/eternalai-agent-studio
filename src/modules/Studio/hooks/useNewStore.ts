import { create } from 'zustand';

type Store = {
  data: Record<string, Record<string, unknown>>;
  addData: (id: string, data: Record<string, unknown>) => void;
};

const useStore = create<Store>((set, get) => ({
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
}));

const createNewStore = <T>(id: string, initialData?: T) => {
  useStore.getState().addData(id, initialData || {});

  return {
    dataStore: useStore.getState().data[id] as T,
    addData: (data: Record<string, Partial<T>>) => {
      useStore.getState().addData(id, data);
    },
    addDataField: (field: string, value: unknown) => {
      useStore.getState().addData(id, {
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
  const data = useStore((state) => state.data[id]) as T;

  return {
    dataStore: data,
    addData: (data: Record<string, Partial<T>>) => {
      useStore.getState().addData(id, data);
    },
    addDataField: (field: string, value: unknown) => {
      useStore.getState().addData(id, {
        [field]: value,
      });
    },
  } as StoreWithAttributes<T>;
};

export { useNewStore, createNewStore };
