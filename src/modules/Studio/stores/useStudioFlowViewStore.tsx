import { create } from 'zustand';

import { XYPosition } from '@xyflow/react';
import { FlowView } from '../types/ui';

type State = {
  mousePosition: XYPosition;
  setMousePosition: (position: XYPosition) => void;

  view: FlowView;
  setView: (view: FlowView) => void;

  clear: () => void;
};

const useStudioFlowViewStore = create<State>((set) => ({
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (position) => set({ mousePosition: position }),

  view: { x: 0, y: 0, zoom: 1 },
  setView: (view) => set({ view }),

  clear: () => {
    set({ mousePosition: { x: 0, y: 0 }, view: { x: 0, y: 0, zoom: 1 } });
  },
}));

export default useStudioFlowViewStore;
