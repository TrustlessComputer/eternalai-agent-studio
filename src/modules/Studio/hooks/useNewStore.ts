import { create } from 'zustand';

type Store = {
  data: Record<string, Record<string, unknown>>;
  addData: (id: string, data: Record<string, unknown>) => void;
};

const useStore = create<Store>((set, get) => ({
  data: {},
  addData: (id, data) => {
    const latestData = get().data;
    set({
      ...latestData,
      [id]: {
        ...(latestData[id] || {}),
        ...data,
      },
    });
  },
}));

const createNewStore = <T>(id: string, initialData?: T) => {
  useStore.getState().addData(id, initialData || {});

  return {
    data: useStore.getState().data[id] as T,
    addData: (data: Record<string, T>) => {
      useStore.getState().addData(id, data);
    },
  } as StoreWithAttributes<T>;
};

type StoreWithAttributes<T> = {
  data: T;
  addData: (data: T) => void;
};
const useNewStore = <T>(id: string) => {
  const data = useStore((state) => state.data[id]) as T;

  return {
    data,
    addData: (data: Record<string, T>) => {
      useStore.getState().addData(id, data);
    },
  } as StoreWithAttributes<T>;
};

export { useNewStore, createNewStore };
