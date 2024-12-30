import { FunctionComponent, ReactNode } from 'react';
import { FormDataType, KeyMapperType } from './base';

type DataSchemaField = string;
type DataSchemaValue = {
  type: 'text' | 'textarea' | 'checkbox' | 'select';
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  dataSourceKey?: string;

  onDataValidate?: <T extends FormDataType>(value: T) => boolean;
  onDataFieldsChange?: <T extends FormDataType>(value: T, onUpdateToStore?: (update: T) => void) => T;
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
};

export enum StudioCategoryTypeEnum {
  INLINE = 'inline',
  STANDALONE = 'standalone',
}

export type StudioCategoryOption = BaseCategoryOption & {
  type?: StudioCategoryTypeEnum; // default is inline
  onSnapValidate?: (value: StudioCategoryOption, to: StudioCategoryOption) => boolean;
  onDroppedInValidate?: (value: StudioCategoryOption) => boolean; // add new item from sidebar to board
  onDroppedOutValidate?: (value: StudioCategoryOption) => boolean; // remove exist item from board to sidebar
};

export type StudioCategory = Omit<BaseCategoryOption, 'value' | 'data' | 'color'> & {
  options: StudioCategoryOption[];
  color: string;
  isRoot?: boolean; // default is false. have only one root in entire category
};

export type StudioCategoryMap = StudioCategory &
  StudioCategoryOption & {
    parent: StudioCategory;
  };
