import cs from 'clsx';
import './Select.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { useMemo } from 'react';
import useStudioDataSourceStore from '@/modules/Studio/stores/useStudioDataSourceStore';

type Props = Omit<React.ComponentPropsWithoutRef<'select'>, 'defaultValue'> & {
  formId: string;
  name: string;
  placeholder?: string;
  dataSourceKey?: string;
};

function Select({ formId, className, name, placeholder = 'Select', dataSourceKey, ...rest }: Props) {
  const { dataForms, setFormFields } = useStudioFormStore();
  const { dataSource } = useStudioDataSourceStore();

  const options = useMemo(() => {
    if (dataSourceKey) {
      return dataSource[dataSourceKey] || [];
    }

    return [];
  }, [dataSource, dataSourceKey]);

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormFields(formId, {
      [name]: e.target.value,
    });
  };

  return (
    <select
      {...rest}
      onChange={handleOnChange}
      name={name}
      className={cs(
        'studio-field-select',
        {
          ['studio-field-select__empty']: !value,
        },
        className,
      )}
      value={value as string}
    >
      <option value="" className="studio-field-select__placeholder">
        {placeholder}
      </option>
      {options.map((op) => (
        <option key={`form-render-select-${formId}-${op.value}`} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  );
}

export default Select;