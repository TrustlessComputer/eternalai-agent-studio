import { create } from 'zustand';

const DEFAULT_VALUE = {
  isDrew: false,
};

type Store = {
  isDrew: boolean;
  setIsDrew: (isDrew: boolean) => void;

  clear: () => void;
};

const useStudioStore = create<Store>((set, get) => ({
  ...DEFAULT_VALUE,

  setIsDrew: (isDrew: boolean) => set({ isDrew }),

  clear: () => set(DEFAULT_VALUE),
}));

export default useStudioStore;
