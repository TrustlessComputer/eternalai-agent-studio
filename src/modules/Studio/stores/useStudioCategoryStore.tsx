import { create } from 'zustand';
import { v4 } from 'uuid';

import { StudioCategory } from '../types/category';

type State = {
  categories: StudioCategory[];
  setCategories: (categories: StudioCategory[]) => void;
};

const useStudioCategoryStore = create<State>((set) => ({
  categories: [],
  setCategories: (categories) => {
    const pipeData = (categories || [])
      .map((item) => {
        const options = item.options
          .map((option) => ({
            ...option,
            id: option.id ?? v4(),
            order: option.order ?? Number.MAX_SAFE_INTEGER,
          }))
          .sort((a, b) => a.order - b.order);

        return {
          ...item,
          id: item.id ?? v4(),
          options,
          order: item.order ?? Number.MAX_SAFE_INTEGER,
        };
      })
      .sort((a, b) => a.order - b.order);
    set({
      categories: pipeData,
    });
  },
}));

export default useStudioCategoryStore;
