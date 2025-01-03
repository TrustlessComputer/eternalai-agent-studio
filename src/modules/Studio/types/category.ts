import { FunctionComponent, ReactNode } from 'react';
import { FormDataMap, Key } from './base';
import { StudioDataNode, StudioNode } from './graph';
import { StudioCategoryType } from '../enums/category';

export type DataSchemaField = string;
export type DataSchemaValue = {
  type: 'text' | 'textarea' | 'checkbox' | 'select';
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  dataSourceKey?: string;
};

export type DataSchema = Record<DataSchemaField, DataSchemaValue>;

export type BaseCategory = {
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

/**
 * handle drag and drop to interact with item
 * @param id current option item id
 * @param option current option item
 * @param parentOption parent option item
 * @param formData option form data
 * @param allFormData all form data
 * @param data data
 * @returns
 */
export type OnStudioInteractPayload = {
  option: StudioCategoryOption;
  parentOption: StudioCategory;
  formData: FormDataMap;
  allFormData: FormDataMap;
  data: StudioDataNode[];
};

export type OnNodeInteractPayload = {
  id: string;
  fromNode: StudioNode;
};

export type OnFlowInteractPayload = {
  toNode: StudioNode;
  toOption: StudioCategoryOption;
};

export type OnCreatePayload = OnStudioInteractPayload;
export type OnDeletePayload = OnStudioInteractPayload & OnNodeInteractPayload;
export type OnAddPayload = OnStudioInteractPayload & OnFlowInteractPayload;
export type OnSplitPayload = OnStudioInteractPayload & OnNodeInteractPayload;
export type OnSnapPayload = OnStudioInteractPayload & OnNodeInteractPayload & OnFlowInteractPayload;
export type OnMergePayload = OnStudioInteractPayload & OnNodeInteractPayload & OnFlowInteractPayload;

export type StudioCategoryDragDropFunction = {
  onSnapValidate?: (data: OnSnapPayload) => boolean; // snap node to root node
  onSplitValidate?: (data: OnSplitPayload) => boolean; // split items to a single node
  onMergeValidate?: (data: OnMergePayload) => boolean; // merge items to a single node
  onDropInValidate?: (data: OnCreatePayload) => boolean; // create new node from sidebar to board
  onDropOutValidate?: (data: OnDeletePayload) => boolean; // remove exist node from board to sidebar
  onAddValidate?: (data: OnAddPayload) => boolean; // add option to node directly
};

export type StudioCategoryBoxWrapper = {
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

export type StudioFormFieldValidate = (
  field: string,
  value: unknown,
  other: {
    formId: string;
    formData: FormDataMap;
    allFormData: FormDataMap;
    data: StudioDataNode[];
  },
) => boolean;
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
  onFieldValidate?: StudioFormFieldValidate;
};

export type StudioCategoryOption = BaseCategory &
  StudioCategoryDragDropFunction &
  StudioCategoryFormFunction &
  StudioOptionCustomizeRender & {
    type?: StudioCategoryType; // default is inline
    boxWrapper?: StudioCategoryBoxWrapper;
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
