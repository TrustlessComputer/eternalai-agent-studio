import { FunctionComponent, ReactNode } from 'react';

export type StudioCategoryItem = {
  id: string;
  keyMapper: string;
  title?: React.ReactNode | FunctionComponent;
  value: string | number;
  disabled?: boolean;
  tooltip?: ReactNode;
  icon?: React.ReactNode | FunctionComponent;
  order: number;
};

export type StudioCategory = {
  id: string;
  keyMapper: string;
  title?: React.ReactNode | FunctionComponent;
  tooltip?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  options: StudioCategoryItem[];
  color: string;
  multipleChoice: boolean;
  icon?: React.ReactNode | FunctionComponent;
  order?: number;
};
