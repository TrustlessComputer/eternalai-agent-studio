import { FunctionComponent, ReactNode } from 'react';
import { FormDataType, KeyMapperType } from './base';
import { StudioNode } from './graph';

type DataSchemaField = string;
type DataSchemaValue = {
  type: 'text' | 'textarea' | 'checkbox' | 'select';
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  dataSourceKey?: string;
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

export type StudioCategoryDragDropFunctionType = {
  /**
   * onSnapValidate
   * handle drag and drop to attach or detach item
   * @param id current option item id
   * @param option current option item
   * @param toOption to option item
   * @param formData option form data
   * @param allFormData all form data
   * @returns
   */
  onSnapValidate?: (data: {
    id: string | undefined;
    option: StudioCategoryOption;
    toOption: StudioCategoryOption;
    formData: FormDataType | null;
    allFormData: FormDataType;
    fromNode?: StudioNode;
    toNode?: StudioNode;
  }) => boolean;

  /**
   * onDroppedInValidate
   * handle drag and drop to add new item from sidebar to board
   * @param id current option item id
   * @param option current option item
   * @param formData option form data
   * @param allFormData all form data
   * @returns
   */
  onDroppedInValidate?: (data: {
    id: string | undefined;
    option: StudioCategoryOption;
    formData: FormDataType | null;
    allFormData: FormDataType;
    toNode?: StudioNode;
  }) => boolean; // add new item from sidebar to board

  /**
   * onDroppedOutValidate
   * handle drag and drop to remove exists item from board to sidebar
   * @param id current option item id
   * @param option current option item
   * @param formData option data
   * @param allFormData all form data
   * @returns
   */
  onDroppedOutValidate?: (data: {
    id: string | undefined;
    option: StudioCategoryOption;
    formData: FormDataType | null;
    allFormData: FormDataType;
    fromNode?: StudioNode;
  }) => boolean; // remove exist item from board to sidebar
};

export type StudioCategoryBoxWrapperType = {
  draggable?: boolean;
  title?: React.ReactNode | FunctionComponent;
  render?: (children: React.ReactNode, option: StudioCategoryOption) => ReactNode;
};

export type StudioCategoryFormFunctionType = {
  // /**
  //  * onFormChange
  //  * handle form change event
  //  * @param value form data
  //  * @returns
  //  */
  // onFormChange?: <T extends FormDataType>(value: T) => void;

  // /**
  //  * onFormValidate
  //  * handle form validate event
  //  * @param value form data
  //  * @param onUpdateToStore update form data to store
  //  * @returns
  //  */
  // onFormValidate?: <T extends FormDataType>(value: T) => boolean;

  // /**
  //  * onFieldChange
  //  * handle field change event
  //  * @param field field name
  //  * @param value field value
  //  * @returns
  //  */
  // onFieldChange?: (field: string, value: unknown) => void;

  // /**
  //  * onFieldValidate
  //  * handle field validate event
  //  * @param field field name
  //  * @param value field value
  //  * @param onUpdateToStore update form data to store
  //  * @returns
  //  */
  onFieldValidate?: (field: string, value: unknown) => boolean;
};

export type StudioCategoryOption = BaseCategory &
  StudioCategoryDragDropFunctionType &
  StudioCategoryFormFunctionType & {
    type?: StudioCategoryTypeEnum; // default is inline
    boxWrapper?: StudioCategoryBoxWrapperType;
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
