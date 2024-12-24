import { StudioFormType } from "../../../enums/form";
import { AgentStudioInputType } from "../../../enums/input";

export type StudioForm = {
  id: string;
  type: StudioFormType;
  data: Record<string, any>;
};

export type StudioField = {
  key: string;
  value: any;
  type: AgentStudioInputType;
  isNested: boolean;
  required: boolean;
  hidden: boolean;
  disabled: boolean;
  order: number;
  options: StudioField[];
  placeableAmount: number; // -1 means unlimited
};

export type StudioCategory = {
  key: string;
  name: string;
  tooltip: string;
  icon: string;
  color: string;
  disabled: boolean;
  hidden: boolean;
  order: number;
  required: boolean;
  placeableAmount: number; // -1 means unlimited
  fields: StudioField[];
};


