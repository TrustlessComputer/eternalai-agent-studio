import cs from 'clsx';
import './TextArea.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';

type Props = Omit<React.ComponentPropsWithoutRef<'textarea'>, 'defaultValue'> & {
  formId: string;
  name: string;
};

function TextArea({ formId, placeholder, className, name, ...rest }: Props) {
  const { dataForms, setFormFields } = useStudioFormStore();

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormFields(formId, {
      [name]: e.target.value,
    });
  };

  return (
    <textarea
      {...rest}
      onChange={handleOnChange}
      placeholder={placeholder}
      name={name}
      className={cs('studio-field-text-area', className)}
      value={value as string}
      rows={4}
    />
  );
}

export default TextArea;