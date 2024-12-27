import { create } from 'zustand';

import { StudioCategory, StudioCategoryMap } from '../types/category';

interface State {
  categories: StudioCategory[];
  mapCategories: Record<string, StudioCategoryMap>;
  setCategories: (categories: StudioCategory[]) => void;

  filters: string[];
  setFilters: (filter: string) => void;
}

const flatCategoriesByKeyMapper = (categories: StudioCategory[], parent?: StudioCategory) => {
  let mapCategories: Record<string, StudioCategoryMap> = {};
  categories.forEach((item) => {
    if (item?.options?.length) {
      const subCategories = flatCategoriesByKeyMapper(item.options as StudioCategory[], item);
      mapCategories = {
        ...mapCategories,
        ...subCategories,
      };
    }
    if (parent) {
      mapCategories[item.keyMapper] = {
        ...item,
        parent,
      };
    } else {
      mapCategories[item.keyMapper] = item as StudioCategoryMap;
    }
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
