import { FunctionComponent, JSX, ReactNode } from 'react';

import { FormDataMap, Key } from './base';
import { StudioDataNode, StudioNode } from './graph';
import { StudioCategoryType } from '../enums/category';

export type DataSchemaField = string;
export type DataSchemaValue = {
  type: 'text' | 'textarea' | 'checkbox' | 'select' | 'hidden';
  label?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  dataSourceKey?: string;
};

export type DataSchema = Record<DataSchemaField, DataSchemaValue>;

export type BaseCategory = {
  idx: Key;
  title?: React.ReactNode | FunctionComponent;
  tooltip?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  icon?: React.ReactNode | FunctionComponent | string;
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
export type OnLinkPayload = OnStudioInteractPayload & OnFlowInteractPayload;
export type OnSplitPayload = OnStudioInteractPayload & OnNodeInteractPayload;
export type OnSnapPayload = OnStudioInteractPayload & OnNodeInteractPayload & OnFlowInteractPayload;
export type OnMergePayload = OnStudioInteractPayload & OnNodeInteractPayload & OnFlowInteractPayload;
export type StudioCategoryDragDropFunction = {
  onLinkValidate?: (data: OnLinkPayload) => boolean; // link option to node
  onSnapValidate?: (data: OnSnapPayload) => boolean; // snap node to root node
  onSplitValidate?: (data: OnSplitPayload) => boolean; // split items to a single node
  onMergeValidate?: (data: OnMergePayload) => boolean; // merge items to a single node
  onDropInValidate?: (data: OnCreatePayload) => boolean; // create new node from sidebar to board
  onDropOutValidate?: (data: OnDeletePayload) => boolean; // remove exist node from board to sidebar
  onAddValidate?: (data: OnAddPayload) => boolean; // add option to node directly
};

export type StudioCategoryBoxWrapperProps = {
  draggable?: boolean;
  title?: React.ReactNode | FunctionComponent;
  render?: (children: React.ReactNode, option: StudioCategoryOption) => ReactNode;
};

export type StudioCategoryOptionRenderPayload<T = FormDataMap> = {
  id: string;
  option: StudioCategoryOption;
  formData: T;
  setFormFields: (fields: Partial<T>) => void;
  allFormData: FormDataMap;
  data: StudioDataNode[];
  resetFormData: () => void;
};

export type StudioOptionCustomizeRender = {
  // render?: (data: StudioCategoryOptionRenderPayload) => ReactNode;
  customizeRenderOnSideBar?: (props: StudioCategoryOption) => ReactNode;
  customizeRenderOnBoard?: <T>(data: StudioCategoryOptionRenderPayload<T>) => ReactNode | JSX.Element;
};

export type StudioCategoryCustomizeRender = {
  customizeRenderOnTab?: (props: StudioCategory) => ReactNode;
  customizeRenderOnSidebar?: (props: StudioCategory) => ReactNode;
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
  onFieldValidate?: StudioFormFieldValidate;
};

export type StudioCategoryOption = BaseCategory &
  StudioCategoryDragDropFunction &
  StudioCategoryFormFunction &
  StudioOptionCustomizeRender & {
    type?: StudioCategoryType; // default is inline
    boxWrapper?: StudioCategoryBoxWrapperProps;
    multipleChoice?: boolean; // default true, this field apply for all
  };

export type StudioCategory = Omit<BaseCategory, 'value' | 'data'> &
  StudioCategoryDragDropFunction & {
    options: StudioCategoryOption[];
    isRoot?: boolean; // default is false. have only one root in entire category
    multipleOption?: boolean; // default true, this field apply for all
  } & StudioCategoryCustomizeRender;

export type StudioCategoryMapValue = StudioCategory;
export type StudioCategoryOptionMapValue = StudioCategoryOption & {
  parent: StudioCategory;
};
