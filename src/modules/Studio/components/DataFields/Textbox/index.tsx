import cs from 'clsx';
import './Textbox.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  formId: string;
  name: string;
};

function Textbox({ formId, placeholder, className, name, defaultValue, ...rest }: Props) {
  const { dataForms, setFormFields } = useStudioFormStore();

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields(formId, {
      [name]: e.target.value,
    });
  };

  return (
    <input
      {...rest}
      onChange={handleOnChange}
      type="text"
      placeholder={placeholder}
      name={name}
      defaultValue={defaultValue}
      className={cs('studio-field-input', className)}
      value={value as string}
    />
  );
}

export default Textbox;
