/**
 * The hook to export the function can integrate/manipulation to studio agent
 */

import { useCallback, useMemo } from 'react';
import useStudioFlowStore from '../stores/useStudioFlowStore';
import useStudioFormStore from '../stores/useStudioFormStore';
import useStudioDataStore from '../stores/useStudioDataStore';
import useStudioFlowViewStore from '../stores/useStudioFlowViewStore';
import useStudioDndStore from '../stores/useStudioDndStore';
import { transformDataToNodes } from '../utils/node';
import { getFieldDataFromRawData } from '../utils/data';
import { StudioDataNode } from '../types/graph';

export const useStudioAgent = () => {
  const cleanup = useCallback(() => {
    useStudioFlowStore.getState().clear();
    useStudioFormStore.getState().clear();
    useStudioDataStore.getState().clear();
    useStudioFlowViewStore.getState().clear();
    useStudioDndStore.getState().clear();
  }, []);

  const redraw = useCallback((data: StudioDataNode[]) => {
    useStudioDataStore.getState().setData(data);

    const initNodes = transformDataToNodes(data);
    useStudioFlowStore.getState().addNodes(initNodes);

    const formData = getFieldDataFromRawData(data);
    useStudioFormStore.getState().initDataForms(formData);
  }, []);

  const getFormDataById = useCallback((id: string) => {
    return useStudioFormStore.getState().getFormById(id);
  }, []);

  const changeFormFields = useCallback((id: string, fields: Record<string, unknown>) => {
    return useStudioFormStore.getState().setFormFields(id, fields);
  }, []);

  const memorizedValue = useMemo(() => {
    return {
      cleanup,
      redraw,
      getFormDataById,
      changeFormFields,
    };
  }, [cleanup, redraw, getFormDataById, changeFormFields]);

  return memorizedValue;
};
