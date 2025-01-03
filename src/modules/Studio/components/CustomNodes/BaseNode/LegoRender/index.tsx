import { FunctionComponent, useCallback, useMemo } from 'react';
import { DataSchema, StudioCategoryOptionRenderPayload } from '@/modules/Studio/types/category';
import Lego from '../../../Lego';
import LegoContent from '../../../LegoContent';
import TextRender from '../../../Render/TextRender';
import FormRender from '../../../DataFields/FormRender';
import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import { FormDataMap } from '@/modules/Studio/types/base';
import NoDraggable from '../../../DnD/NoDraggable';

import './LegoRender.scss';

type Props = {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemadata?: DataSchema;
  title: React.ReactNode | FunctionComponent;
  idx: string;
  readonly?: boolean;
  render?: (data: StudioCategoryOptionRenderPayload) => React.ReactNode;
};

const LegoRenderBase = ({ background, icon, id, schemadata, title, idx, readonly }: Omit<Props, 'render'>) => {
  const fields = useMemo(() => Object.keys(schemadata || {}), [schemadata]);

  const isDynamicHeight = useMemo(() => {
    if (fields.length > 1) {
      return true;
    }

    const field = fields[0];
    const fieldData = (schemadata || {})[field];

    return fieldData?.type === 'textarea';
  }, [fields, schemadata]);

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
        <FormRender readonly={readonly} idx={idx} id={id} schemadata={schemadata}>
          <TextRender data={title} />
        </FormRender>
      </LegoContent>
    </Lego>
  );
};

const LegoRenderCustomization = ({ background, icon, id, idx, render, title }: Props) => {
  const categoryOptionMap = useStudioCategoryStore((state) => state.categoryOptionMap);
  const allFormData = useStudioFormStore((state) => state.formMap);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);

  const data = useStudioDataStore((state) => state.data);

  const formData = allFormData[id];
  const option = categoryOptionMap[idx];

  const specifyFormFields = useCallback(
    (fields: FormDataMap) => {
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
