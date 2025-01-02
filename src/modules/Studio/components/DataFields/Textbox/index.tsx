import cs from 'clsx';
import './Textbox.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import NoDraggable from '../../DnD/NoDraggable';
import { DataSchema } from '@/modules/Studio/types/category';
import { useFormFunction } from '@/modules/Studio/hooks/useFormFunction';

type Props = Omit<React.ComponentPropsWithoutRef<'input'>, 'defaultValue'> & {
  formId: string;
  name: string;
  readonly?: boolean;
  schemaData?: DataSchema;
  key: string;
};

function Textbox({ formId, placeholder, className, name, readonly, key, ...rest }: Props) {
  const formFunctions = useFormFunction(key);
  const dataForms = useStudioFormStore((state) => state.dataForms);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readonly) {
      setFormFields(formId, {
        [name]: e.target.value,
      });
    }
  };

  const isError = !(formFunctions?.onFieldValidate?.(name, value) ?? true);

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
