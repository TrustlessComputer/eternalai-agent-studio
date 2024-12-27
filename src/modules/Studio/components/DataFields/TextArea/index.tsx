import cs from 'clsx';
import './TextArea.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import NoDraggable from '../../DnD/NoDraggable';

type Props = Omit<React.ComponentPropsWithoutRef<'textarea'>, 'defaultValue'> & {
  formId: string;
  name: string;
  readonly?: boolean;
};

function TextArea({ formId, placeholder, className, name, readonly, ...rest }: Props) {
  const { dataForms, setFormFields } = useStudioFormStore();

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readonly) {
      setFormFields(formId, {
        [name]: e.target.value,
      });
    }
  };

  return (
    <NoDraggable>
      <textarea
        {...rest}
        onChange={handleOnChange}
        placeholder={placeholder}
        name={name}
        className={cs('studio-field-text-area', className)}
        value={value as string}
        rows={4}
      />
    </NoDraggable>
  );
}

export default TextArea;
