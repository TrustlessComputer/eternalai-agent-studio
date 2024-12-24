import { create } from 'zustand';
import { Position } from '../types/ui';

type State = {
  mousePosition: Position;
  setMousePosition: (position: Position) => void;
};

const useStudioBoardMouse = create<State>((set) => ({
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (position) => set({ mousePosition: position }),
}));

export default useStudioBoardMouse;
