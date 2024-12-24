import React, { Component } from 'react';

export type StudioCategoryItem = {
  id: string;
  keyMapper: string;
  title?: string | React.ReactNode | Component | React.FC;
  value: string | number;
  disabled?: boolean;
  tooltip?: string | React.ReactNode | Component | React.FC;
  icon: string;
  order: number;
};

export type StudioCategory = {
  id: string;
  keyMapper: string;
  title?: string | React.ReactNode | Component | React.FC;
  tooltip?: string | React.ReactNode | Component | React.FC;
  required?: true;
  disabled?: boolean;
  options: StudioCategoryItem[];
  color: string;
  multipleChoice: boolean;
  order: number;
};
