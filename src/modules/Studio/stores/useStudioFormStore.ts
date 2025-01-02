import { create } from 'zustand';
import { FormDataType } from '../types/base';

const DEFAULT_VALUE = {
  dataForms: {},
};

type Store = {
  dataForms: Record<string, FormDataType>;
  initDataForms: (data: Record<string, FormDataType>) => void;
  addForm: (id: string, data: FormDataType) => void;
  editForm: (id: string, data: FormDataType) => void;
  setFormFields: (id: string, fields: Record<string, unknown>) => void;
  removeForm: (id: string) => void;
  getFormById: (id: string) => FormDataType;
  clear: () => void;
};

const useStudioFormStore = create<Store>((set, get) => ({
  ...DEFAULT_VALUE,
  initDataForms: (data) => {
    set({ dataForms: data });
  },
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
  clear: () => set(DEFAULT_VALUE),
}));

export default useStudioFormStore;
