import { Edge, OnConnect, OnEdgesChange, OnNodesChange } from "@xyflow/react";
import { AgentStudioNode } from "modules/Studio/types/flow";

type StudioFlowStoreState = {
  nodes: AgentStudioNode[];
  edges: Edge[];

  disabledZoom: boolean;
};

type StudioFlowStoreActions = {
  setNodes: (nodes: AgentStudioNode[]) => void;
  setEdges: (edges: Edge[]) => void;

  getNode: (nodeId: string) => AgentStudioNode | undefined;
  getEdge: (edgeId: string) => Edge | undefined;

  getNodes: (nodeIds: string[]) => AgentStudioNode[];
  getEdges: (edgeIds: string[]) => Edge[];

  removeNode: (nodeId: string) => void;
  removeNodes: (nodeIds: string[]) => void;

  disableZoom: () => void;
  enableZoom: () => void;

  onNodesChange: OnNodesChange<AgentStudioNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

export type StudioFlowStore = StudioFlowStoreState & StudioFlowStoreActions;
