import { StudioFormType } from "enums/form";
import { useMemo } from "react";
import { create } from "zustand";
import { StudioFormStore } from "./types";

// DO NOT USE STORE DIRECTLY, IT CAUSES RE-RENDERING ISSUES
const useStudioFormStore = create<StudioFormStore>((set) => ({
  forms: [],
  setForms: (forms) => set({ forms }),

  addForm: (form) => set((state) => ({ forms: [...state.forms, form] })),
  editForm: (id, updatedForm) => set((state) => {
    const forms = state.forms.map((form) => form.id === id ? updatedForm : form);
    return { forms };
  }),
  removeForm: (id) => set((state) => ({ forms: state.forms.filter((f) => f.id !== id) })),


  addSpecificField: (id, fieldKey, fieldValue) => set((state) => {
    const forms = state.forms
    const form = forms.find((form) => form.id === id);

    if (!form) return { forms };

    const updatedForm = { ...form, data: { ...form.data, [fieldKey]: fieldValue } };
    return { forms: [...forms.filter((f) => f.id !== id), updatedForm] };
  }),
  editSpecificField: (id, fieldKey, fieldValue) => set((state) => {
    const forms = state.forms
    const form = forms.find((form) => form.id === id);

    if (!form) return { forms };

    const updatedForm = { ...form, data: { ...form.data, [fieldKey]: fieldValue } };
    return { forms: [...forms.filter((f) => f.id !== id), updatedForm] };
  }),
  removeSpecificField: (id, fieldKey) => set((state) => {
    const forms = state.forms
    const form = forms.find((form) => form.id === id);

    if (!form) return { forms };

    const updatedForm = { ...form, data: { ...form.data, [fieldKey]: undefined } };
    return { forms: [...forms.filter((f) => f.id !== id), updatedForm] };
  }),
}));

export const useStudioFormStoreActions = () => useStudioFormStore((state) => ({
  setForms: state.setForms,
  addForm: state.addForm,
  editForm: state.editForm,
  editSpecificField: state.editSpecificField,
  removeForm: state.removeForm,
}));

export const useStudioForms = () => useStudioFormStore((state) => state.forms);

export const useGetSpecificStudioForm = (id: string) => {
  const forms = useStudioForms();

  return useMemo(() => forms.find((form) => form.id === id), [forms, id]);
}

export const useGetSpecificField = (id: string, fieldKey: string) => {
  const form = useGetSpecificStudioForm(id);
  return useMemo(() => form?.data[fieldKey], [form, fieldKey]);
}

export const useGetAllFormsByType = (type: StudioFormType) => {
  const forms = useStudioForms();
  return useMemo(() => forms.filter((form) => form.type === type), [forms, type]);
}
