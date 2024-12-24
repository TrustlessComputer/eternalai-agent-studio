import { StudioForm } from "types/data";

type StudioFormStoreState = {
  forms: StudioForm[];
};

type StudioFormStoreActions = {
  setForms: (forms: StudioForm[]) => void;

  addForm: (form: StudioForm) => void;
  editForm: (id: string, form: StudioForm) => void;
  removeForm: (id: string) => void;

  addSpecificField: (id: string, fieldKey: string, fieldValue: any) => void;
  editSpecificField: (id: string, fieldKey: string, fieldValue: any) => void;
  removeSpecificField: (id: string, fieldKey: string) => void;
};

export type StudioFormStore = StudioFormStoreState & StudioFormStoreActions;
