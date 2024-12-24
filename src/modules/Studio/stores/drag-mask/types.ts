import { AgentStudioNode } from "modules/Studio/types/flow";

type DragMaskStoreState = {
  draggingNode: AgentStudioNode | null;
};

type DragMaskStoreActions = {
  dragNode: (node: AgentStudioNode) => void;
  dropNode: () => void;
};

export type DragMaskStore = DragMaskStoreState & DragMaskStoreActions;
