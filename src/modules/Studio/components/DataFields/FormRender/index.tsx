import { DataSchema } from '@/modules/Studio/types/category';
import { useMemo } from 'react';
import Textbox from '../Textbox';
import TextArea from '../TextArea';
import Select from '../Select';

import './FormRender.scss';

type Props = React.PropsWithChildren & {
  id: string;
  schemaData?: DataSchema;
  categoryId: string;
};

function FormRender({ id, categoryId, schemaData, children }: Props) {
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
              <Textbox formId={id} name={field} placeholder={fieldData.placeholder} />
            </div>
          </div>
        );
      } else if (fieldData.type === 'textarea') {
        return <TextArea formId={id} name={field} placeholder={fieldData.placeholder} />;
      } else if (fieldData.type === 'select') {
        return <Select categoryId={categoryId} formId={id} name={field} placeholder={fieldData.placeholder} />;
      }
    } else {
      // render multiple files
      return (
        <div className="studio-form-multiple-field">
          <div className="studio-form-multiple-field-row">{children}</div>

          {fields.map((field) => {
            return (
              <div className="studio-form-multiple-field-row" key={`studio-form-multiple-field-row${id}-${field}`}>
                {schemaData[field].type === 'text' && (
                  <Textbox formId={id} name={field} placeholder={schemaData[field].placeholder} />
                )}
                {schemaData[field].type === 'textarea' && (
                  <TextArea formId={id} name={field} placeholder={schemaData[field].placeholder} />
                )}
                {schemaData[field].type === 'select' && (
                  <Select
                    categoryId={categoryId}
                    formId={id}
                    name={field}
                    placeholder={schemaData[field].placeholder}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    }
  }

  return <></>;
}

export default FormRender;
