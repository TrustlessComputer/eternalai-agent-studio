import { create } from 'zustand';

import { FlowView, Position } from '../types/ui';

type State = {
  mousePosition: Position;
  setMousePosition: (position: Position) => void;

  view: FlowView;
  setView: (view: FlowView) => void;
};

const useStudioFlowViewStore = create<State>((set) => ({
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (position) => set({ mousePosition: position }),

  view: { x: 0, y: 0, zoom: 1 },
  setView: (view) => set({ view }),
}));

export default useStudioFlowViewStore;
