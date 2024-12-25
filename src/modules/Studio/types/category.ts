import { FunctionComponent, ReactNode } from 'react';

type DataSchemaField = string;
type DataSchemaValue = {
  type: 'string' | 'number' | 'boolean';
  value: string | number | boolean;
};

type DataSchema = Record<DataSchemaField, DataSchemaValue>;

type BaseCategory = {
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

export type StudioCategoryItem = BaseCategory;

export type StudioCategory = Omit<BaseCategory, 'value' | 'data'> & {
  options: StudioCategoryItem[];
  color: string;
};
