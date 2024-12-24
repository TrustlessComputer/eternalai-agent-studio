import { ReactNode } from 'react';

export type StudioCategoryItem = {
  id: string;
  keyMapper: string;
  title?: ReactNode;
  value: string | number;
  disabled?: boolean;
  tooltip?: ReactNode;
  icon: string;
  order: number;
};

export type StudioCategory = {
  id: string;
  keyMapper: string;
  title?: ReactNode;
  tooltip?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  options: StudioCategoryItem[];
  color: string;
  multipleChoice: boolean;
  order?: number;
};
