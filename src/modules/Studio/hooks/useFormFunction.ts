import { useMemo } from 'react';
import useStudioCategoryStore from '../stores/useStudioCategoryStore';

export const useFormFunction = (key: string) => {
  const categoryMap = useStudioCategoryStore((state) => state.categoryMap);

  const memorizedFuncs = useMemo(() => {
    return {
      // onFormChange: categoryMap[key].onFormChange,
      // onFormValidate: categoryMap[key].onFormValidate,
      // onFieldChange: categoryMap[key].onFieldChange,
      onFieldValidate: categoryMap[key]?.onFieldValidate || (() => {}),
    };
  }, [key, categoryMap]);

  return memorizedFuncs;
};
