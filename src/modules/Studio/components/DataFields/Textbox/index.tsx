import cs from 'clsx';
import './Textbox.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import NoDraggable from '../../DnD/NoDraggable';

type Props = Omit<React.ComponentPropsWithoutRef<'input'>, 'defaultValue'> & {
  formId: string;
  name: string;
  readonly?: boolean;
};

function Textbox({ formId, placeholder, className, name, readonly, ...rest }: Props) {
  const { dataForms, setFormFields } = useStudioFormStore();

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readonly) {
      setFormFields(formId, {
        [name]: e.target.value,
      });
    }
  };

  return (
    <NoDraggable>
      <input
        {...rest}
        onChange={handleOnChange}
        type="text"
        placeholder={placeholder}
        name={name}
        className={cs('studio-field-input', className)}
        value={value as string}
      />
    </NoDraggable>
  );
}

export default Textbox;
