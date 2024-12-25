import { create } from 'zustand';

import { StudioCategory, StudioCategoryOption } from '../types/category';

interface State {
  categories: StudioCategory[];
  mapCategories: Record<string, StudioCategory | StudioCategoryOption>;
  setCategories: (categories: StudioCategory[]) => void;

  filters: string[];
  setFilters: (filter: string) => void;
}

const flatCategoriesByKeyMapper = (categories: StudioCategory[]) => {
  let mapCategories: Record<string, StudioCategory> = {};
  categories.forEach((item) => {
    if (item?.options?.length) {
      const subCategories = flatCategoriesByKeyMapper(item.options as StudioCategory[]);
      mapCategories = {
        ...mapCategories,
        ...subCategories,
      };
    }
    mapCategories[item.keyMapper] = item;
  });

  return mapCategories;
};

const useStudioCategoryStore = create<State>((set, get) => ({
  categories: [],
  mapCategories: {},
  setCategories: (categories) => {
    const pipeData = (categories || [])
      .map((item) => {
        const options = item.options
          .map((option) => ({
            ...option,
            color: option.color || item.color,
            order: option.order ?? Number.MAX_SAFE_INTEGER,
          }))
          .sort((a, b) => a.order - b.order);

        return {
          ...item,
          options,
          order: item.order ?? Number.MAX_SAFE_INTEGER,
        };
      })
      .sort((a, b) => a.order - b.order);
    set({
      categories: pipeData,
      mapCategories: flatCategoriesByKeyMapper(pipeData),
    });
  },

  filters: [],
  setFilters: (filter) => {
    const filters = get().filters;
    const matchedFilter = filters.find((item) => item === filter);
    if (matchedFilter) {
      set({ filters: filters.filter((item) => item !== filter) });
    } else {
      set({ filters: [...filters, filter] });
    }
  },
}));

export default useStudioCategoryStore;
