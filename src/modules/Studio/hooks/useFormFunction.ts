import { useMemo } from 'react';
import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { StudioFormFieldValidate } from '../types';

export const useFormFunction = (key: string) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const memorizedFuncs = useMemo(() => {
    return {
      // onFormChange: categoryMap[key].onFormChange,
      // onFormValidate: categoryMap[key].onFormValidate,
      // onFieldChange: categoryMap[key].onFieldChange,
      onFieldValidate: categoryMap[key]?.onFieldValidate || ((() => true) as StudioFormFieldValidate),
    };
  }, [key, categoryMap]);

  return memorizedFuncs;
};
