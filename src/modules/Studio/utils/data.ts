import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { FormDataType } from '../types/base';
import { StudioCategoryOption } from '../types/category';
import { StudioDataNode } from '../types/graph';

export const getFormDataFromCategoryOption = (category: StudioCategoryOption) => {
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
  const categoryMap = useStudioCategoryStore.getState().categoryMap;
  data.forEach((item) => {
    const defaultValues = getFormDataFromCategoryOption(categoryMap[item.key] || {});

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
