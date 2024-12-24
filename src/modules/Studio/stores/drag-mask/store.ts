import { create } from "zustand";
import { DragMaskStore } from "./types";

// DO NOT USE STORE DIRECTLY, IT CAUSES RE-RENDERING ISSUES
const useDragMaskStore = create<DragMaskStore>((set) => ({
  draggingNode: null,

  dragNode: (node) => set({ draggingNode: node }),
  dropNode: () => set({ draggingNode: null }),
}));

export const useDraggingNode = () => {
  return useDragMaskStore((state) => state.draggingNode);
};

export const useDragMaskActions = () => {
  return useDragMaskStore((state) => ({
    dragNode: state.dragNode,
    dropNode: state.dropNode,
  }));
};
