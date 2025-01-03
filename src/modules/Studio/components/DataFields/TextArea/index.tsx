import cs from 'clsx';
import './TextArea.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import NoDraggable from '../../DnD/NoDraggable';
import { DataSchema } from '@/modules/Studio/types/category';
import { useFormFunction } from '@/modules/Studio/hooks/useFormFunction';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import { useMemo } from 'react';

type Props = Omit<React.ComponentPropsWithoutRef<'textarea'>, 'defaultValue'> & {
  formId: string;
  name: string;
  readonly?: boolean;
  schemadata?: DataSchema;
  fieldKey: string;
};

function TextArea({ formId, placeholder, className, name, readonly, fieldKey, ...rest }: Props) {
  // const data = useStudioDataStore((state) => state.data);
  const formFunctions = useFormFunction(fieldKey);
  const formMap = useStudioFormStore((state) => state.formMap);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);

  const value = formMap[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        {...rest}
        onChange={handleOnChange}
        placeholder={placeholder}
        name={name}
        className={cs('studio-field-text-area', className, {
          'studio-field-text-area__error': isError,
        })}
        value={value as string}
        rows={4}
      />
    </NoDraggable>
  );
}

export default TextArea;
