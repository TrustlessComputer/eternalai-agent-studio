import { FunctionComponent, useCallback, useMemo } from 'react';
import { DataSchema, StudioCategoryOptionRenderPayload } from '@/modules/Studio/types/category';
import Lego from '../../../Lego';
import LegoContent from '../../../LegoContent';
import TextRender from '../../../Render/TextRender';
import FormRender from '../../../DataFields/FormRender';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import { FormDataType } from '@/modules/Studio/types/base';
import NoDraggable from '../../../DnD/NoDraggable';

import './LegoRender.scss';

type Props = {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemaData?: DataSchema;
  title: React.ReactNode | FunctionComponent;
  categoryKey: string;
  readonly?: boolean;
  render?: (data: StudioCategoryOptionRenderPayload) => React.ReactNode;
};

const LegoRenderBase = ({ background, icon, id, schemaData, title, categoryKey, readonly }: Omit<Props, 'render'>) => {
  const fields = useMemo(() => Object.keys(schemaData || {}), [schemaData]);

  const isDynamicHeight = useMemo(() => {
    if (fields.length > 1) {
      return true;
    }

    const field = fields[0];
    const fieldData = (schemaData || {})[field];

    return fieldData?.type === 'textarea';
  }, [fields, schemaData]);

  const isFixedHeight = !isDynamicHeight;

  return (
    <Lego
      background={background}
      icon={icon}
      fixedHeight={isFixedHeight}
      style={{
        width: '100%',
      }}
    >
      <LegoContent>
        <FormRender readonly={readonly} categoryKey={categoryKey} id={id} schemaData={schemaData}>
          <TextRender data={title} />
        </FormRender>
      </LegoContent>
    </Lego>
  );
};

const LegoRenderCustomization = ({ background, icon, id, categoryKey, render, title }: Props) => {
  const mapCategories = useStudioCategoryStore((state) => state.mapCategories);
  const allFormData = useStudioFormStore((state) => state.dataForms);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);

  const data = useStudioDataStore((state) => state.data);

  const formData = allFormData[id];
  const option = mapCategories[categoryKey];

  const specifyFormFields = useCallback(
    (fields: FormDataType) => {
      return setFormFields(id, fields);
    },
    [id, setFormFields],
  );

  if (!render) {
    return <></>;
  }

  return (
    <Lego
      background={background}
      icon={icon}
      fixedHeight={false}
      style={{
        width: '100%',
      }}
    >
      <LegoContent>
        <div className="studio-customize-content">
          <div className="studio-customize-content__title">
            <TextRender data={title} />
          </div>
          <NoDraggable className="studio-customize-content__no-draggable">
            {render({
              option,
              formData: formData || {},
              setFormFields: specifyFormFields,
              allFormData,
              data,
            })}
          </NoDraggable>
        </div>
      </LegoContent>
    </Lego>
  );
};

export default function LegoRender({ render, ...rest }: Props) {
  if (render) {
    return <LegoRenderCustomization render={render} {...rest} />;
  }

  return <LegoRenderBase {...rest} />;
}
