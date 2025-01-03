import { create } from 'zustand';

import { StudioCategory, StudioCategoryMap } from '../types/category';
import { StudioDataNode } from '../types/graph';
import { COLOR_PALETTES, POPULAR } from '../constants/color-palettes';
import categoryColorDatabase from '../database/category-color-database';
import { DEFAULT_CATEGORY_TYPE } from '../constants/default-values';

const DEFAULT_VALUE = {
  rootCategory: null,
  categories: [],
  categoryMap: {},
  filters: [],
  usedKeyCollection: {},
};

type Store = {
  rootCategory: StudioCategory | null;
  setRootCategory: (category: StudioCategory | null) => void;

  categories: StudioCategory[];
  categoryMap: Record<string, StudioCategoryMap>;
  setCategories: (categories: StudioCategory[]) => Promise<void>;
  updateCategory: (category: StudioCategory) => void;

  updateCategoriesForEntry: (entry: StudioDataNode | null) => void;

  filters: string[];
  setFilters: (filter: string) => void;

  usedKeyCollection: Record<string, string>;
  setUsedKeyCollection: (collection: Record<string, string>) => void;

  clear: () => void;
};

const persistCategoryColor = async (key: string, color: string) => {
  try {
    await categoryColorDatabase.upsertItem({
      key,
      color,
    });
  } catch (e) {
    //
  }
};

const popularUsagedCollection: Record<string, string> = {};
const pickFromPopularColorFirst = (key: string, color?: string) => {
  if (color) {
    return color;
  }

  // random color
  const max = POPULAR.length;
  const randomIndex = Math.floor(Math.random() * max);
  const newColor = POPULAR[randomIndex];

  // check if color is already used
  if (popularUsagedCollection[newColor]) {
    return pickFromPopularColorFirst(key);
  }

  popularUsagedCollection[newColor] = newColor;

  return newColor;
};

const getCategoryColor = (colorCollection: Record<string, string>, key: string, color?: string) => {
  if (color) {
    return color;
  }

  const popularColor = pickFromPopularColorFirst(key, color);
  if (popularColor) {
    colorCollection[popularColor] = popularColor;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    persistCategoryColor(key, popularColor);

    return popularColor;
  }
  // random color
  const max = COLOR_PALETTES.length;
  const randomIndex = Math.floor(Math.random() * max);
  const newColor = COLOR_PALETTES[randomIndex];

  // check if color is already used
  if (colorCollection[newColor]) {
    return getCategoryColor(colorCollection, key);
  }

  colorCollection[newColor] = newColor;

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  persistCategoryColor(key, newColor);

  return newColor;
};

const flatCategoriesByKey = (categories: StudioCategory[], parent?: StudioCategory) => {
  let categoryMap: Record<string, StudioCategoryMap> = {};
  categories.forEach((item) => {
    if (item?.options?.length) {
      const subCategories = flatCategoriesByKey(item.options as StudioCategory[], item);
      categoryMap = {
        ...categoryMap,
        ...subCategories,
      };
    }
    if (parent) {
      categoryMap[item.key] = {
        ...item,
        parent,
      };
    } else {
      categoryMap[item.key] = item as StudioCategoryMap;
    }
  });

  return categoryMap;
};

const useStudioCategoryStore = create<Store>((set, get) => ({
  ...DEFAULT_VALUE,

  setRootCategory: (category) => {
    set({ rootCategory: category });
  },
  setCategories: async (categories) => {
    const existingCollection = await categoryColorDatabase.getAllItemsToMap();

    const colorCollection: Record<string, string> = {};
    const pipeData = (categories || [])
      .map((item) => {
        const options = item.options
          .map((option) => {
            if (option.color) {
              colorCollection[option.color] = option.color;
            }

            return {
              ...option,
              color: option.color || item.color,
              order: option.order ?? Number.MAX_SAFE_INTEGER,
              type: option.type ?? DEFAULT_CATEGORY_TYPE,
              multipleChoice: option.multipleChoice ?? true,
            };
          })
          .sort((a, b) => a.order - b.order);

        if (item.color) {
          colorCollection[item.color] = item.color;
        }

        return {
          ...item,
          options,
          order: item.order ?? Number.MAX_SAFE_INTEGER,
          multipleOption: item.multipleOption ?? true,
        };
      })
      .map((item) => {
        // generate color for category
        return {
          ...item,
          color: getCategoryColor(colorCollection, item.key, item.color || existingCollection[item.key]),
        };
      })
      .map((item) => {
        // generate color for option category
        const options = item.options.map((option) => {
          return {
            ...option,
            color: getCategoryColor(colorCollection, option.key, option.color || existingCollection[option.key] || item.color),
          };
        });

        return {
          ...item,
          options,
        };
      })
      .sort((a, b) => a.order - b.order) as StudioCategory[];

    const rootCategory = pipeData?.find((item) => item.isRoot);
    set({
      rootCategory,
      categories: pipeData,
      categoryMap: flatCategoriesByKey(pipeData),
    });
  },
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
      if (item.key === category.key) {
        return category;
      }

      return item;
    });

    set({ categories: newCategories });
  },
  updateCategoriesForEntry: (entry) => {
    const { rootCategory, categoryMap, categories } = get();
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
              disabled: categoryMap[item.key]?.disabled ?? false,
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
              disabled: true,
            };
          }
        });

        set({ categories: newCategories });
      }
    }
  },
  setUsedKeyCollection: (collection) => {
    // const { usedKeyCollection } = get();
    // set({ usedKeyCollection: { ...usedKeyCollection, ...collection } });
    // const { usedKeyCollection } = get();
    set({ usedKeyCollection: collection });
  },

  clear: () => set(DEFAULT_VALUE),
}));

export default useStudioCategoryStore;
