import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import useStudioDataStore from '../stores/useStudioDataStore';
import { FormDataMap } from '../types/base';
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
  let formData: Record<string, FormDataMap> = {};
  const categoryMap = useStudioCategoryStore.getState().categoryMap;

  data.forEach((item) => {
    const defaultValues = getFormDataFromCategoryOption(categoryMap[item.idx] || {});

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

export const min = (...args: number[]) => Math.min(...args);
export const max = (...args: number[]) => Math.max(...args);

export const findDataById = (id: string, data: StudioDataNode[]) => {
  for (const item of data) {
    if (item.id === id) {
      return item;
    }
    if (item.children.length > 0) {
      const foundNode = findDataById(id, item.children) as StudioDataNode;
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return null;
};

export const findDataByOptionKey = (optionKey: string, nodeId?: string) => {
  const data = useStudioDataStore.getState().data;

  const matchedNode = nodeId ? findDataById(nodeId, data) : null;

  if (!matchedNode) {
    return [];
  }

  const dataShouldBeFind = matchedNode ? [matchedNode] : data;

  const returnVal: StudioDataNode[] = [];
  dataShouldBeFind.forEach((dataNode) => {
    if (dataNode.idx === optionKey) {
      returnVal.push(dataNode);
    }
    if (dataNode.children.length) {
      returnVal.push(...findDataByOptionKey(optionKey, dataNode.id));
    }
  });

  return returnVal;
};

export const findDataByCategoryKey = (categoryKey: string, nodeId?: string) => {
  const data = useStudioDataStore.getState().data;
  const categoryMap = useStudioCategoryStore.getState().categoryMap;

  const matchedNode = nodeId ? findDataById(nodeId, data) : null;

  if (!matchedNode) {
    return [];
  }

  const dataShouldBeFind = matchedNode ? [matchedNode] : data;

  const returnVal: StudioDataNode[] = [];

  const categoryOptionKeys = categoryMap[categoryKey].options.map((option) => option.idx);
  categoryOptionKeys.forEach((optionKey) => {
    dataShouldBeFind.forEach((dataNode) => {
      if (dataNode.idx === optionKey) {
        returnVal.push(dataNode);
      }
      if (dataNode.children.length) {
        returnVal.push(...findDataByOptionKey(optionKey, dataNode.id));
      }
    });
  });

  return returnVal;
};
