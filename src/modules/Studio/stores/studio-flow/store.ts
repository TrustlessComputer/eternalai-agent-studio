import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand";
import { StudioFlowStore } from "./types";

// DO NOT USE THE WHOLE STORE, IT CAUSES RE-RENDERING ISSUES
const studioFlowStore = create<StudioFlowStore>((set, get) => ({
  nodes: [],
  setNodes: (nodes) => set({ nodes }),

  edges: [],
  setEdges: (edges) => set({ edges }),

  getNode: (nodeId) => get().nodes.find((node) => node.id === nodeId),
  getEdge: (edgeId) => get().edges.find((edge) => edge.id === edgeId),

  getNodes: (nodeIds) => get().nodes.filter((node) => nodeIds.includes(node.id)),
  getEdges: (edgeIds) => get().edges.filter((edge) => edgeIds.includes(edge.id)),

  removeNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== nodeId),
  })),
  removeNodes: (nodeIds) => set((state) => ({
    nodes: state.nodes.filter((node) => !nodeIds.includes(node.id)),
  })),

  disabledZoom: false,
  disableZoom: () => set({ disabledZoom: true }),
  enableZoom: () => set({ disabledZoom: false }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));

export const useStudioFlowNodes = () => studioFlowStore((state) => state.nodes);
export const useStudioFlowEdges = () => studioFlowStore((state) => state.edges);

export const useStudioFlowStoreActions = () => studioFlowStore((state) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,

  getNode: state.getNode,
  getEdge: state.getEdge,

  getNodes: state.getNodes,
  getEdges: state.getEdges,

  removeNode: state.removeNode,
  removeNodes: state.removeNodes,

  disableZoom: state.disableZoom,
  enableZoom: state.enableZoom,

  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
}));
