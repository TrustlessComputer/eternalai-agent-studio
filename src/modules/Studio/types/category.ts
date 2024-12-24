import { FunctionComponent, ReactNode } from 'react';

type DataSchemaValue = {
  type: 'string' | 'number' | 'boolean';
  value: string | number | boolean;
};

type DataSchema = Record<string, DataSchemaValue>;

type BaseCategory = {
  id: string;
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
