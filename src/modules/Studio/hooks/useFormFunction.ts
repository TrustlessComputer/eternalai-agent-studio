import { useMemo } from 'react';

import useStudioCategoryStore from '../stores/useStudioCategoryStore';
import { StudioFormFieldValidate } from '../types';

export const useFormFunction = (idx: string) => {
  const categoryOptionMap = useStudioCategoryStore((state) => state.categoryOptionMap);

  const memorizedFuncs = useMemo(() => {
    return {
      // onFormChange: categoryMap[key].onFormChange,
      // onFormValidate: categoryMap[key].onFormValidate,
      // onFieldChange: categoryMap[key].onFieldChange,
      onFieldValidate: categoryOptionMap[idx]?.onFieldValidate || ((() => true) as StudioFormFieldValidate),
    };
  }, [idx, categoryOptionMap]);

  return memorizedFuncs;
};
