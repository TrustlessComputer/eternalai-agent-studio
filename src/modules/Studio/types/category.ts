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

type BaseCategory = {
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

export type StudioCategoryOption = BaseCategory & {
  type?: StudioCategoryTypeEnum; // default is inline
  /**
   * onSnapValidate
   * handle drag and drop to attach or detach item
   * @param id current option item id
   * @param option current option item
   * @param to to option item
   * @param formData option form data
   * @param allFormData all form data
   * @returns
   */
  onSnapValidate?: (
    id: string,
    option: StudioCategoryOption,
    to: StudioCategoryOption,
    formData: FormDataType,
    allFormData: FormDataType,
  ) => boolean;

  /**
   * onDroppedInValidate
   * handle drag and drop to add new item from sidebar to board
   * @param id current option item id
   * @param option current option item
   * @param formData option form data
   * @param allFormData all form data
   * @returns
   */
  onDroppedInValidate?: (id: string, option: StudioCategoryOption, formData: FormDataType, allFormData: FormDataType) => boolean; // add new item from sidebar to board

  /**
   * onDroppedOutValidate
   * handle drag and drop to remove exists item from board to sidebar
   * @param id current option item id
   * @param option current option item
   * @param formData option data
   * @param allFormData all form data
   * @returns
   */
  onDroppedOutValidate?: (id: string, option: StudioCategoryOption, formData: FormDataType, allFormData: FormDataType) => boolean; // remove exist item from board to sidebar
};

export type StudioCategory = Omit<BaseCategory, 'value' | 'data' | 'color'> & {
  options: StudioCategoryOption[];
  color: string;
  isRoot?: boolean; // default is false. have only one root in entire category
};

export type StudioCategoryMap = StudioCategory &
  StudioCategoryOption & {
    parent: StudioCategory;
  };
