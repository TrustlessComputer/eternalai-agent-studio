import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { FormDataType } from '../types/base';
import { StudioCategoryMap } from '../types/category';
import { StudioDataNode } from '../types/graph';

export const getFormDataFromCategory = (category: StudioCategoryMap) => {
  const categoryData = category?.data || {};
  const defaultValues = Object.keys(categoryData).reduce(
    (acc, key) => ({
      ...acc,
      [key]: categoryData[key].defaultValue,
    }),
    {},
  );

  return defaultValues;
};

export const getFieldDataFromRawData = (data: StudioDataNode[]) => {
  let formData: Record<string, FormDataType> = {};
  const mapCategories = useStudioCategoryStore.getState().mapCategories;
  data.forEach((item) => {
    const defaultValues = getFormDataFromCategory(mapCategories[item.keyMapper] || {});

    formData[item.id] = {
      ...defaultValues,
      ...(item.data || {}),
    };

    if (item.children.length) {
      formData = {
        ...formData,
        ...getFieldDataFromRawData(item.children),
      };
    }
  });

  return formData;
};

export const cloneData = <T>(data: T): T => JSON.parse(JSON.stringify(data));
