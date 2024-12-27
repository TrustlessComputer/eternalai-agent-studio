import { DataSchema } from '@/modules/Studio/types/category';
import { useMemo } from 'react';
import Select from '../Select';
import TextArea from '../TextArea';
import Textbox from '../Textbox';

import './FormRender.scss';

type Props = React.PropsWithChildren & {
  id: string;
  schemaData?: DataSchema;
  categoryId: string;
  readonly?: boolean;
};

function FormRender({ id, schemaData, children, readonly }: Props) {
  const fields = useMemo(() => Object.keys(schemaData || {}), [schemaData]);

  if (fields.length && schemaData) {
    if (fields.length === 1) {
      // render single field
      const field = fields[0];
      const fieldData = schemaData[field];
      if (fieldData.type === 'text') {
        return (
          <div className="studio-form-single-field">
            <div className="studio-form-single-field-row">{children}</div>
            <div className="studio-form-single-field-row">
              <Textbox readonly={readonly} formId={id} name={field} placeholder={fieldData.placeholder} />
            </div>
          </div>
        );
      } else if (fieldData.type === 'textarea') {
        return (
          <div className="studio-form-single-field">
            <div className="studio-form-single-field-row">{children}</div>
            <div className="studio-form-single-field-row">
              <TextArea readonly={readonly} formId={id} name={field} placeholder={fieldData.placeholder} />
            </div>
          </div>
        );
      } else if (fieldData.type === 'select') {
        return (
          <div className="studio-form-single-field">
            <div className="studio-form-single-field-row">{children}</div>
            <div className="studio-form-single-field-row">
              <Select
                readonly={readonly}
                formId={id}
                name={field}
                placeholder={fieldData.placeholder}
                dataSourceKey={schemaData[field].dataSourceKey}
              />
            </div>
          </div>
        );
      }
    } else {
      // render multiple fields
      return (
        <div className="studio-form-multiple-field">
          <div className="studio-form-multiple-field-heading">{children}</div>

          <div className="studio-form-multiple-field-table">
            {fields.map((field) => {
              return (
                <div className="studio-form-multiple-field-row" key={`studio-form-multiple-field-row${id}-${field}`}>
                  <span>{schemaData[field].label}</span>
                  <div>
                    {schemaData[field].type === 'text' && (
                      <Textbox
                        readonly={readonly}
                        formId={id}
                        name={field}
                        placeholder={schemaData[field].placeholder}
                      />
                    )}
                    {schemaData[field].type === 'textarea' && (
                      <TextArea
                        readonly={readonly}
                        formId={id}
                        name={field}
                        placeholder={schemaData[field].placeholder}
                      />
                    )}
                    {schemaData[field].type === 'select' && (
                      <Select
                        readonly={readonly}
                        formId={id}
                        name={field}
                        placeholder={schemaData[field].placeholder}
                        dataSourceKey={schemaData[field].dataSourceKey}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  return <></>;
}

export default FormRender;
