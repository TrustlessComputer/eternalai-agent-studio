import { create } from 'zustand';

import { StudioCategory } from '../types/category';

type State = {
  categories: StudioCategory[];
  setCategories: (categories: StudioCategory[]) => void;
  getCategoryById: (id: string) => StudioCategory | undefined;
};

const useStudioCategoryStore = create<State>((set, get) => ({
  categories: [],
  setCategories: (categories) => {
    set({ categories: categories.sort((a, b) => a.order - b.order) });
  },
  getCategoryById: (id) => get().categories.find((category) => category.id === id),
}));

export default useStudioCategoryStore;
