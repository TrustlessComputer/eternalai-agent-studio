import { FunctionComponent, ReactNode } from 'react';

type DataSchemaField = string;
type DataSchemaValue = {
  type: 'text' | 'textarea' | 'checkbox';
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  // onValidate?: (value: unknown, dataFormNode: FormData) => boolean;
};

export type DataSchema = Record<DataSchemaField, DataSchemaValue>;

type BaseCategoryOption = {
  key: string;
  keyMapper: string;
  title?: React.ReactNode | FunctionComponent;
  tooltip?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode | FunctionComponent;
  order?: number;
  customizeRenderOnNavigation?: FunctionComponent;
  customizeRenderOnSideBar?: FunctionComponent;
  customizeRenderOnBoard?: FunctionComponent;
  data?: DataSchema;
};

export type StudioCategoryOption = BaseCategoryOption;

export type StudioCategory = Omit<BaseCategoryOption, 'value' | 'data'> & {
  options: StudioCategoryOption[];
  color: string;
};
