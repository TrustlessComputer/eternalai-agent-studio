/**
 * The hook to export the function can integrate/manipulation to studio
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
import useStudioCategoryStore from '../stores/useStudioCategoryStore';
// import { useReactFlow } from '@xyflow/react';

export const useStudio = () => {
  // const { setCenter } = useReactFlow();

  const cleanup = useCallback(() => {
    useStudioCategoryStore.getState().clear();
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

  const getOptionPlaceQuantity = useCallback((optionId: string): number => {
    let quantity = 0;

    const nodes = useStudioFlowStore.getState().nodes;
    const formMap = useStudioFormStore.getState().formMap;

    console.log('[useStudio] getOptionPlaceQuantity', { optionId, nodes, formMap });

    nodes.forEach((node) => {
      const formId = node.id;
      const formData = formMap[formId];

      if (formData[optionId]) {
        quantity++;
      }
    });

    return quantity;
  }, []);

  const checkOptionIsPlaced = useCallback((optionId: string): boolean => {
    return getOptionPlaceQuantity(optionId) > 0;
  }, []);

  const changeFormFields = useCallback((id: string, fields: Record<string, unknown>) => {
    return useStudioFormStore.getState().setFormFields(id, fields);
  }, []);

  // const focusNode = useCallback((id: string) => {
  //   const node = useStudioFlowStore.getState().nodes.find((node) => node.id === id);
  //   if (!node) return;

  //   const { position, measured } = node;
  //   if (!measured) return;

  //   const { x, y } = position;
  //   const { width = 0, height = 0 } = measured;

  //   const centerX = x + width / 2;
  //   const centerY = y + height / 2;

  //   setCenter(centerX, centerY);
  // }, []);

  const memorizedValue = useMemo(() => {
    return {
      cleanup,
      redraw,
      getFormDataById,
      changeFormFields,
      getOptionPlaceQuantity,
      checkOptionIsPlaced,
      // focusNode,
    };
  }, [cleanup, redraw, getFormDataById, changeFormFields, getOptionPlaceQuantity, checkOptionIsPlaced]);

  return memorizedValue;
};
