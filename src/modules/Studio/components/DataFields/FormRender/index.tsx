import { useMemo } from 'react';

import Select from '../Select';
import TextArea from '../TextArea';
import Textbox from '../Textbox';

import { DataSchema } from '@/modules/Studio/types/category';
import './FormRender.scss';

type Props = React.PropsWithChildren & {
  id: string;
  schemadata?: DataSchema;
  idx: string;
  readonly?: boolean;
};

function FormRender({ id, schemadata, children, readonly, idx }: Props) {
  const fields = useMemo(() => Object.keys(schemadata || {}), [schemadata]);

  const renderForm = () => {
    if (fields.length && schemadata) {
      if (fields.length === 1) {
        // render single field
        const field = fields[0];
        const fieldData = schemadata[field];

        if (fieldData.type === 'text') {
          return (
            <div className="studio-form-single-field">
              <div className="studio-form-single-field-row">{children}</div>
              <div className="studio-form-single-field-row">
                <Textbox
                  readonly={readonly}
                  formId={id}
                  name={field}
                  placeholder={fieldData.placeholder}
                  schemadata={schemadata}
                  fieldKey={idx}
                />
              </div>
            </div>
          );
        }

        if (fieldData.type === 'textarea') {
          return (
            <div className="studio-form-multiple-field">
              <div className="studio-form-multiple-field-heading">{children}</div>

              <div className="studio-form-multiple-field-table">
                {fields.map((field) => {
                  return (
                    <div
                      className="studio-form-multiple-field-row"
                      key={`studio-form-multiple-field-row-${id}-${field}`}
                    >
                      <div>
                        <TextArea
                          readonly={readonly}
                          formId={id}
                          name={field}
                          placeholder={fieldData.placeholder}
                          schemadata={schemadata}
                          fieldKey={idx}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (fieldData.type === 'select') {
          return (
            <div className="studio-form-single-field">
              <div className="studio-form-single-field-row">{children}</div>
              <div className="studio-form-single-field-row">
                <Select
                  readonly={readonly}
                  formId={id}
                  name={field}
                  placeholder={fieldData.placeholder}
                  dataSourceKey={schemadata[field].dataSourceKey}
                  schemadata={schemadata}
                  fieldKey={idx}
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
                  <div className="studio-form-multiple-field-row" key={`studio-form-multiple-field-row-${id}-${field}`}>
                    <span>{schemadata[field].label}</span>

                    <div>
                      {schemadata[field].type === 'text' && (
                        <Textbox
                          readonly={readonly}
                          formId={id}
                          name={field}
                          placeholder={schemadata[field].placeholder}
                          fieldKey={idx}
                        />
                      )}

                      {schemadata[field].type === 'textarea' && (
                        <TextArea
                          readonly={readonly}
                          formId={id}
                          name={field}
                          placeholder={schemadata[field].placeholder}
                          fieldKey={idx}
                        />
                      )}

                      {schemadata[field].type === 'select' && (
                        <Select
                          readonly={readonly}
                          formId={id}
                          name={field}
                          placeholder={schemadata[field].placeholder}
                          dataSourceKey={schemadata[field].dataSourceKey}
                          fieldKey={idx}
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

    return <>{children}</>;
  };

  return <div className="studio-form-render">{renderForm()}</div>;
}

export default FormRender;
