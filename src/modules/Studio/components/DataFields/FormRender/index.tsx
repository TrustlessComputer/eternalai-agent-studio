import { DataSchema } from '@/modules/Studio/types/category';
import { useMemo } from 'react';
import Textbox from '../Textbox';

type Props = {
  id: string;
  schemaData?: DataSchema;
};

function FormRender({ id, schemaData }: Props) {
  const fields = useMemo(() => Object.keys(schemaData || {}), [schemaData]);

  if (fields.length && schemaData) {
    if (fields.length === 1) {
      // render single field
      const field = fields[0];
      const fieldData = schemaData[field];
      if (fieldData.type === 'text') {
        return <Textbox formId={id} name={field} placeholder={fieldData.placeholder} />;
      }
    } else {
      // render multiple files
    }
  }

  return <></>;
}

export default FormRender;
