/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';

import { StudioCategory, StudioCategoryFromProp, StudioCategoryMap } from '../types/category';
import { StudioDataNode } from '../types/graph';
import { COLOR_PALETTES, POPULAR } from '../constants/color-palettes';
import categoryColorDatabase from '../database/category-color-database';
import { DEFAULT_CATEGORY_TYPE } from '../constants/defaultValues';

interface State {
  rootCategory: StudioCategory | null;
  setRootCategory: (category: StudioCategory | null) => void;
  categories: StudioCategory[];
  mapCategories: Record<string, StudioCategoryMap>;
  setCategories: (categories: StudioCategoryFromProp[]) => Promise<void>;

  filters: string[];
  setFilters: (filter: string) => void;

  // just update category for render
  updateCategory: (category: StudioCategory) => void;

  updateCategoriesForEntry: (entry: StudioDataNode | null) => void;

  usedKeyCollection: Record<string, string>;
  setUsedKeyCollection: (collection: Record<string, string>) => void;

  clear: () => void;
}

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
          color: getCategoryColor(colorCollection, item.keyMapper, item.color || existingCollection[item.keyMapper]),
        };
      })
      .map((item) => {
        // generate color for option category
        const options = item.options.map((option) => {
          return {
            ...option,
            color: getCategoryColor(
              colorCollection,
              option.keyMapper,
              option.color || existingCollection[option.keyMapper] || item.color,
            ),
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
          if (item.keyMapper === rootCategory.keyMapper) {
            return {
              ...item,
              disabled: true,
            };
          } else {
            return {
              ...item,
              disabled: mapCategories[item.keyMapper]?.disabled ?? false,
            };
          }
        });

        set({ categories: newCategories });
      } else {
        const newCategories = categories.map((item) => {
          if (item.keyMapper === rootCategory.keyMapper) {
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

  usedKeyCollection: {},
  setUsedKeyCollection: (collection) => {
    // const { usedKeyCollection } = get();
    // set({ usedKeyCollection: { ...usedKeyCollection, ...collection } });
    // const { usedKeyCollection } = get();
    set({ usedKeyCollection: collection });
  },

  clear: () => {
    set({
      rootCategory: null,
      categories: [],
      mapCategories: {},
      filters: [],
      usedKeyCollection: {},
    });
  },
}));

export default useStudioCategoryStore;
