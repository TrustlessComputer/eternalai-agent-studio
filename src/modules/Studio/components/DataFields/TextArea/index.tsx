import cs from 'clsx';
import './TextArea.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import NoDraggable from '../../DnD/NoDraggable';
import { DataSchema } from '@/modules/Studio/types/category';
import { useFormFunction } from '@/modules/Studio/hooks/useFormFunction';

type Props = Omit<React.ComponentPropsWithoutRef<'textarea'>, 'defaultValue'> & {
  formId: string;
  name: string;
  readonly?: boolean;
  schemaData?: DataSchema;
  fieldKey: string;
};

function TextArea({ formId, placeholder, className, name, readonly, fieldKey, ...rest }: Props) {
  const formFunctions = useFormFunction(fieldKey);
  const dataForms = useStudioFormStore((state) => state.dataForms);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readonly) {
      setFormFields(formId, {
        [name]: e.target.value,
      });
    }
  };

  const isError = !(formFunctions?.onFieldValidate?.(name, value) ?? true);

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
