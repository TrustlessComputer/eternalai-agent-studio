import { useMemo } from 'react';
import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { StudioFormFieldValidate } from '../types';

export const useFormFunction = (idx: string) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const memorizedFuncs = useMemo(() => {
    return {
      // onFormChange: categoryMap[key].onFormChange,
      // onFormValidate: categoryMap[key].onFormValidate,
      // onFieldChange: categoryMap[key].onFieldChange,
      onFieldValidate: categoryMap[idx]?.onFieldValidate || ((() => true) as StudioFormFieldValidate),
    };
  }, [idx, categoryMap]);

  return memorizedFuncs;
};
