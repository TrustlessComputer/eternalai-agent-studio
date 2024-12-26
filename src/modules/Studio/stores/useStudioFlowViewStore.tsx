import { create } from 'zustand';

import { XYPosition } from '@xyflow/react';
import { FlowView } from '../types/ui';

const DEFAULT_VALUE = {
  mousePosition: { x: 0, y: 0 },
  view: { x: 0, y: 0, zoom: 1 },
  disabledZoom: false,
  panOnDrag: true,
};

type State = {
  mousePosition: XYPosition;
  setMousePosition: (position: XYPosition) => void;

  view: FlowView;
  setView: (view: FlowView) => void;

  disabledZoom: boolean;
  disableZoom: () => void;
  enableZoom: () => void;

  panOnDrag: boolean;
  disablePanOnDrag: () => void;
  enablePanOnDrag: () => void;

  clear: () => void;
};

const useStudioFlowViewStore = create<State>((set) => ({
  ...DEFAULT_VALUE,

  setMousePosition: (position) => set({ mousePosition: position }),

  setView: (view) => set({ view }),

  disableZoom: () => set({ disabledZoom: true }),
  enableZoom: () => set({ disabledZoom: false }),

  disablePanOnDrag: () => set({ panOnDrag: false }),
  enablePanOnDrag: () => set({ panOnDrag: true }),

  clear: () => {
    set(DEFAULT_VALUE);
  },
}));

export default useStudioFlowViewStore;
