import { useCallback, useMemo } from 'react';

import useStudioConfigStore from '@/modules/Studio/stores/useStudioConfigStore';

const useStudioFlow = () => {
  const enableZoom = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledZoom: false,
      },
    });
  }, []);

  const disableZoom = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledZoom: true,
      },
    });
  }, []);

  const disableDrag = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledDrag: true,
      },
    });
  }, []);

  const enableDrag = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledDrag: false,
      },
    });
  }, []);

  const enableBackground = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledBackground: false,
      },
    });
  }, []);

  const disableBackground = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledBackground: true,
      },
    });
  }, []);

  const enableMiniMap = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledMiniMap: false,
      },
    });
  }, []);

  const disableMiniMap = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledMiniMap: true,
      },
    });
  }, []);

  const enableControls = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledControls: false,
      },
    });
  }, []);

  const disableControls = useCallback(() => {
    return useStudioConfigStore.getState().setConfig({
      ...useStudioConfigStore.getState().config,
      board: {
        ...useStudioConfigStore.getState().config.board,
        disabledControls: true,
      },
    });
  }, []);

  const memorizedValue = useMemo(() => {
    return {
      enableZoom,
      disableZoom,
      enableDrag,
      disableDrag,
      enableBackground,
      disableBackground,
      enableMiniMap,
      disableMiniMap,
      enableControls,
      disableControls,
    };
  }, [
    enableZoom,
    disableZoom,
    enableDrag,
    disableDrag,
    enableBackground,
    disableBackground,
    enableMiniMap,
    disableMiniMap,
    enableControls,
    disableControls,
  ]);

  return memorizedValue;
};

export default useStudioFlow;
