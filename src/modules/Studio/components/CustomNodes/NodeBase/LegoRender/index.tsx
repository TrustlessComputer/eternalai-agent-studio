import { FunctionComponent, useCallback, useMemo } from 'react';

import FormRender from '../../../DataFields/FormRender';
import Lego from '../../../Lego';
import LegoContent from '../../../LegoContent';
import TextRender from '../../../Render/TextRender';

import useStudioCategoryStore from '@/modules/Studio/stores/useStudioCategoryStore';
import useStudioDataStore from '@/modules/Studio/stores/useStudioDataStore';
import useStudioFormStore from '@/modules/Studio/stores/useStudioFormStore';
import { FormDataMap } from '@/modules/Studio/types/base';
import { DataSchema, StudioCategoryOptionRenderPayload } from '@/modules/Studio/types/category';

import './LegoRender.scss';

type Props<T> = {
  background?: string;
  icon: React.ReactNode | FunctionComponent;
  id: string;
  schemadata?: DataSchema;
  title: React.ReactNode | FunctionComponent;
  idx: string;
  readonly?: boolean;
  render?: (data: StudioCategoryOptionRenderPayload<T>) => React.ReactNode;
};

const LegoRenderBase = <T,>({ background, icon, id, schemadata, title, idx, readonly }: Omit<Props<T>, 'render'>) => {
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

const LegoRenderCustomization = <T,>({ background, icon, id, idx, render, title }: Props<T>) => {
  const categoryOptionMap = useStudioCategoryStore((state) => state.categoryOptionMap);
  const allFormData = useStudioFormStore((state) => state.formMap);
  const setFormFields = useStudioFormStore((state) => state.setFormFields);
  const resetFormById = useStudioFormStore((state) => state.resetFormById);

  const data = useStudioDataStore((state) => state.data);

  const formData = allFormData[id];
  const option = categoryOptionMap[idx];

  const specifyFormFields = useCallback(
    (fields: T | FormDataMap) => {
      return setFormFields(id, fields as FormDataMap);
    },
    [id, setFormFields],
  );

  const resetFormData = useCallback(() => {
    return resetFormById(id);
  }, [id, resetFormById]);

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
      {render({
        id,
        option,
        formData: formData || {},
        setFormFields: specifyFormFields,
        allFormData,
        data,
        resetFormData,
      })}
    </Lego>
  );
};

export default function LegoRender<T>({ render, ...rest }: Props<T>) {
  if (render) {
    return <LegoRenderCustomization render={render} {...rest} />;
  }

  return <LegoRenderBase {...rest} />;
}
