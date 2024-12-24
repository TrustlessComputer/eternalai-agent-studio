import { FunctionComponent, ReactNode } from 'react';

import { NodeType } from '@/enums/node-type';

export type CategoryKeyMapperType = NodeType | string;

export type StudioCategoryItem = {
  id: string;
  keyMapper: CategoryKeyMapperType;
  title?: React.ReactNode | FunctionComponent;
  tooltip?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  value: string | number;
  icon?: React.ReactNode | FunctionComponent;
  order: number;
};

export type StudioCategory = {
  id: string;
  keyMapper: CategoryKeyMapperType;
  title?: React.ReactNode | FunctionComponent;
  tooltip?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  options: StudioCategoryItem[];
  color: string;
  multipleChoice: boolean;
  icon?: React.ReactNode | FunctionComponent;
  order?: number;
};
