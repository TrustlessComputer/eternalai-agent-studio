import { FunctionComponent, ReactNode } from 'react';
import { FormDataMap, Key } from './base';
import { StudioDataNode, StudioNode } from './graph';

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
  key: Key;
  title?: React.ReactNode | FunctionComponent;
  tooltip?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  icon?: React.ReactNode | FunctionComponent;
  order?: number;
  data?: DataSchema;
  color?: string;
};

export enum StudioCategoryType {
  INLINE = 'inline',
  STANDALONE = 'standalone',
}

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
export type StudioCategoryOptionSnapValidatePayload = {
  id?: string;
  option?: StudioCategoryOption;
  parentOption?: StudioCategory;
  toOption?: StudioCategoryOption;
  formData?: FormDataMap | null;
  allFormData?: FormDataMap;
  fromNode?: StudioNode;
  toNode?: StudioNode;
  data: StudioDataNode[];
};

/**
 * onDropInValidate
 * handle drag and drop to add new item from sidebar to board
 * @param id current option item id
 * @param option current option item
 * @param formData option form data
 * @param allFormData all form data
 * @returns
 */
export type StudioCategoryOptionDropInValidatePayload = {
  id: string | undefined;
  option?: StudioCategoryOption;
  parentOption?: StudioCategory;
  formData?: FormDataMap | null;
  allFormData?: FormDataMap;
  toNode?: StudioNode;
  data: StudioDataNode[];
};

/**
 * onDropOutValidate
 * handle drag and drop to remove exists item from board to sidebar
 * @param id current option item id
 * @param option current option item
 * @param formData option data
 * @param allFormData all form data
 * @returns
 */
export type StudioCategoryOptionDropOutValidatePayload = {
  id: string | undefined;
  option?: StudioCategoryOption;
  parentOption?: StudioCategory;
  formData?: FormDataMap | null;
  allFormData?: FormDataMap;
  fromNode?: StudioNode;
  data: StudioDataNode[];
};

export type StudioCategoryDragDropFunction = {
  onSnapValidate?: (data: StudioCategoryOptionSnapValidatePayload) => boolean;
  onDropInValidate?: (data: StudioCategoryOptionDropInValidatePayload) => boolean; // add new item from sidebar to board
  onDropOutValidate?: (data: StudioCategoryOptionDropOutValidatePayload) => boolean; // remove exist item from board to sidebar
};

export type StudioCategoryBoxWrapperType = {
  draggable?: boolean;
  title?: React.ReactNode | FunctionComponent;
  render?: (children: React.ReactNode, option: StudioCategoryOption) => ReactNode;
};

export type StudioCategoryOptionRenderPayload = {
  option: StudioCategoryOption;
  formData: FormDataMap;
  setFormFields: (fields: FormDataMap) => void;
  allFormData: FormDataMap;
  data: StudioDataNode[];
};

export type StudioOptionCustomizeRender = {
  // render?: (data: StudioCategoryOptionRenderPayload) => ReactNode;
  customizeRenderOnSideBar?: () => ReactNode;
  customizeRenderOnBoard?: (data: StudioCategoryOptionRenderPayload) => ReactNode;
};

export type StudioCategoryFormFunction = {
  // /**
  //  * onFormChange
  //  * handle form change event
  //  * @param value form data
  //  * @returns
  //  */
  // onFormChange?: <T extends FormDataMap>(value: T) => void;

  // /**
  //  * onFormValidate
  //  * handle form validate event
  //  * @param value form data
  //  * @param onUpdateToStore update form data to store
  //  * @returns
  //  */
  // onFormValidate?: <T extends FormDataMap>(value: T) => boolean;

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
  StudioCategoryDragDropFunction &
  StudioCategoryFormFunction &
  StudioOptionCustomizeRender & {
    type?: StudioCategoryType; // default is inline
    boxWrapper?: StudioCategoryBoxWrapperType;
    multipleChoice?: boolean; // default true
  };

export type StudioCategory = Omit<BaseCategory, 'value' | 'data'> & {
  options: StudioCategoryOption[];
  isRoot?: boolean; // default is false. have only one root in entire category
  multipleOption?: boolean; // default true
  customizeRenderOnNavigation?: () => ReactNode;
};

export type StudioCategoryMap = StudioCategory &
  StudioCategoryOption & {
    parent: StudioCategory;
  };
