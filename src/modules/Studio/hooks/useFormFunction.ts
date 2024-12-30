import { useMemo } from 'react';
import useStudioCategoryStore from '../stores/useStudioCategoryStore';

export const useFormFunction = (keyMapper: string) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);

  const memorizedFuncs = useMemo(() => {
    return {
      // onFormChange: mapCategories[keyMapper].onFormChange,
      // onFormValidate: mapCategories[keyMapper].onFormValidate,
      // onFieldChange: mapCategories[keyMapper].onFieldChange,
      onFieldValidate: mapCategories[keyMapper].onFieldValidate,
    };
  }, [keyMapper, mapCategories]);

  return memorizedFuncs;
};
