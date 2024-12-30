import { create } from 'zustand';

import { StudioCategory, StudioCategoryMap } from '../types/category';
import { StudioDataNode } from '../types/graph';

interface State {
  rootCategory: StudioCategory | null;
  setRootCategory: (category: StudioCategory | null) => void;
  categories: StudioCategory[];
  mapCategories: Record<string, StudioCategoryMap>;
  setCategories: (categories: StudioCategory[]) => void;

  filters: string[];
  setFilters: (filter: string) => void;

  // just update category for render
  updateCategory: (category: StudioCategory) => void;

  updateCategoriesForEntry: (entry: StudioDataNode | null) => void;
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
  rootCategory: null,
  setRootCategory: (category) => {
    set({ rootCategory: category });
  },
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

    const rootCategory = pipeData?.find((item) => item.isRoot);
    set({
      rootCategory,
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

  updateCategory: (category) => {
    // just update category for render
    const { categories } = get();
    const newCategories = categories.map((item) => {
      if (item.keyMapper === category.keyMapper) {
        return category;
      }

      return item;
    });

    set({ categories: newCategories });
  },

  updateCategoriesForEntry: (entry) => {
    const { rootCategory, mapCategories, categories } = get();
    if (rootCategory) {
      if (entry) {
        const newCategories = categories.map((item) => {
          if (item.key === rootCategory.key) {
            return {
              ...item,
              disabled: true,
            };
          } else {
            return {
              ...item,
              disabled: mapCategories[item.key]?.disabled ?? false,
            };
          }
        });

        set({ categories: newCategories });
      } else {
        const newCategories = categories.map((item) => {
          if (item.key === rootCategory.key) {
            return {
              ...item,
              disabled: false,
            };
          } else {
            return {
              ...item,
              disabled: mapCategories[item.key]?.disabled ?? true,
            };
          }
        });

        set({ categories: newCategories });
      }
    }
  },
}));

export default useStudioCategoryStore;
