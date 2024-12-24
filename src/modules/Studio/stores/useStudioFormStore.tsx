import { create } from 'zustand';

type FormData = Record<string, unknown>;
type State = {
  dataForms: Record<string, FormData>;
  addForm: (id: string, data: FormData) => void;
  editForm: (id: string, data: FormData) => void;
  setFormFields: (id: string, fields: Record<string, unknown>) => void;
  removeForm: (id: string) => void;
  getFormById: (id: string) => FormData;
};

const useStudioFormStore = create<State>((set, get) => ({
  dataForms: {},
  addForm: (id, data) => {
    set((state) => ({
      dataForms: {
        ...state.dataForms,
        [id]: data,
      },
    }));
  },
  editForm: (id, data) => {
    set((state) => ({
      dataForms: {
        ...state.dataForms,
        [id]: data,
      },
    }));
  },
  setFormFields: (id, fields) => {
    set((state) => ({
      dataForms: {
        ...state.dataForms,
        [id]: {
          ...state.dataForms[id],
          ...fields,
        },
      },
    }));
  },
  removeForm: (id) => {
    set((state) => {
      const dataForms = { ...state.dataForms };
      delete dataForms[id];

      return { dataForms };
    });
  },
  getFormById: (id) => get().dataForms[id],
}));

export default useStudioFormStore;
