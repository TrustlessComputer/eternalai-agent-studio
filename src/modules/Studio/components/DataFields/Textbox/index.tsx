import cs from 'clsx';
import './Textbox.scss';
import { useMemo } from 'react';

import NoDraggable from '../../DnD/NoDraggable';

import { useFormFunction } from '@/modules/Studio/hooks/useFormFunction';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { DataSchema } from '@/modules/Studio/types/category';

type Props = Omit<React.ComponentPropsWithoutRef<'input'>, 'defaultValue'> & {
  formId: string;
  name: string;
  readonly?: boolean;
  schemadata?: DataSchema;
  fieldKey: string;
};

function Textbox({ formId, placeholder, className, name, readonly, fieldKey, ...rest }: Props) {
  const formFunctions = useFormFunction(fieldKey);

  const formMap = useStudioFormStore((state) => state.formMap);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);

  const value = formMap[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readonly) {
      setFormFields(formId, {
        [name]: e.target.value,
      });
    }
  };

  const isError = useMemo(() => {
    return !(
      formFunctions?.onFieldValidate?.(name, value, {
        formId,
        formData: formMap[formId],
        allFormData: formMap,
        data: useStudioDataStore.getState().data,
      }) ?? true
    );
    // do not update dependencies
  }, [name, value]);

  return (
    <NoDraggable>
      <input
        {...rest}
        onChange={handleOnChange}
        type="text"
        placeholder={placeholder}
        name={name}
        className={cs('studio-field-input', className, {
          'studio-field-input__error': isError,
        })}
        value={value as string}
      />
    </NoDraggable>
  );
}

export default Textbox;
