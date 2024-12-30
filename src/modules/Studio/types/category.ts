import { FunctionComponent, ReactNode } from 'react';
import { KeyMapperType } from './base';

type DataSchemaField = string;
type DataSchemaValue = {
  type: 'text' | 'textarea' | 'checkbox' | 'select';
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  dataSourceKey?: string;
  // onValidate?: (value: unknown, dataFormNode: FormDataType) => boolean;
};

export type DataSchema = Record<DataSchemaField, DataSchemaValue>;

type BaseCategoryOption = {
  key: string;
  keyMapper: KeyMapperType;
  title?: React.ReactNode | FunctionComponent;
  tooltip?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  icon?: React.ReactNode | FunctionComponent;
  order?: number;
  customizeRenderOnNavigation?: FunctionComponent;
  customizeRenderOnSideBar?: FunctionComponent;
  customizeRenderOnBoard?: FunctionComponent;
  data?: DataSchema;
  color?: string;
  type?: 'inline' | 'block' | 'standalone'; // default is block
  isRoot?: boolean; // default is false. have only one root in entire category
};

export type StudioCategoryOption = BaseCategoryOption;

export type StudioCategory = Omit<BaseCategoryOption, 'value' | 'data' | 'color'> & {
  options: StudioCategoryOption[];
  color: string;
};

export type StudioCategoryMap = StudioCategory &
  StudioCategoryOption & {
    parent: StudioCategory;
  };
