import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { FormDataType } from '../types/base';
import { StudioDataNode } from '../types/graph';

export const getFieldDataFromRawData = (data: StudioDataNode[]) => {
  let formData: Record<string, FormDataType> = {};
  const mapCategories = useStudioCategoryStore.getState().mapCategories;
  data.forEach((item) => {
    const categoryData = mapCategories[item.keyMapper]?.data || {};
    const defaultValues = Object.keys(categoryData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: categoryData[key].defaultValue,
      }),
      {},
    );
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
