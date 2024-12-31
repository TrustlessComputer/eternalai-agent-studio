import cs from 'clsx';
import './Select.scss';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { useMemo } from 'react';
import useStudioDataSourceStore from '@/modules/Studio/stores/useStudioDataSourceStore';
import NoDraggable from '../../DnD/NoDraggable';
import { DataSchema } from '@/modules/Studio/types/category';
import { useFormFunction } from '@/modules/Studio/hooks/useFormFunction';

type Props = Omit<React.ComponentPropsWithoutRef<'select'>, 'defaultValue'> & {
  formId: string;
  name: string;
  placeholder?: string;
  dataSourceKey?: string;
  readonly?: boolean;
  schemaData?: DataSchema;
  keyMapper: string;
};

function Select({
  formId,
  className,
  name,
  placeholder = 'Select',
  dataSourceKey,
  readonly,
  keyMapper,
  ...rest
}: Props) {
  const formFunctions = useFormFunction(keyMapper);
  const dataForms = useStudioFormStore((state) => state.dataForms);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);

  const { dataSource } = useStudioDataSourceStore();

  const options = useMemo(() => {
    if (dataSourceKey) {
      return dataSource[dataSourceKey] || [];
    }

    return [];
  }, [dataSource, dataSourceKey]);

  const value = dataForms[formId]?.[name] || '';
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!readonly) {
      const selectable = options.find((op) => op.value === e.target.value)?.selectable;
      if (selectable) {
        setFormFields(formId, {
          [name]: e.target.value,
        });
      }
    }
  };

  const isError = !(formFunctions?.onFieldValidate?.(name, value) ?? true);

  return (
    <NoDraggable>
      <select
        {...rest}
        onChange={handleOnChange}
        name={name}
        className={cs(
          'studio-field-select',
          {
            ['studio-field-select__empty']: !value,
            ['studio-field-select__error']: isError,
          },
          className,
        )}
        value={value as string}
      >
        <option value="" className="studio-field-select__placeholder">
          {placeholder}
        </option>
        {options.map((op) => (
          <option disabled={!op.selectable} key={`form-render-select-${formId}-${op.value}`} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </NoDraggable>
  );
}

export default Select;
