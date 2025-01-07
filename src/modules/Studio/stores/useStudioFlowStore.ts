import { addEdge, applyEdgeChanges, applyNodeChanges, Edge, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';
import { create } from 'zustand';

import { StudioNode } from '../types/graph';

const DEFAULT_VALUE = {
  reloadFlowCounter: 0,
  nodes: [],
  edges: [],
  hiddenNodes: [],
  linkedNodes: {},
};

type Store = {
  reloadFlowCounter: number;
  reloadFlow: () => void;

  nodes: StudioNode[];
  setNodes: (nodes: StudioNode[]) => void;
  addNode: (node: StudioNode) => void;
  addNodes: (nodes: StudioNode[]) => void;

  addLinkedNode: (nodeId: string, linkedNodeId: string) => void;
  linkedNodes: Record<string, string[]>;
  setLinkedNodes: (nodes: Record<string, string[]>) => void;

  updateNode: (node: StudioNode) => void;
  updateNodes: (nodes: StudioNode[]) => void;

  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  addEdge: (edge: Edge) => void;
  addEdges: (edges: Edge[]) => void;

  removeNode: (id: string) => void;
  removeNodes: (ids: string[]) => void;

  onNodesChange: OnNodesChange<StudioNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  hiddenNodes: StudioNode[];
  setHiddenNodes: (nodes: StudioNode[]) => void;

  clear: () => void;
};

const useStudioFlowStore = create<Store>((set, get) => ({
  ...DEFAULT_VALUE,

  reloadFlow: () => {
    set({ reloadFlowCounter: get().reloadFlowCounter + 1 });
  },

  setNodes: (nodes) => set({ nodes }),
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  addNodes: (nodes) => set({ nodes: [...get().nodes, ...nodes] }),

  addLinkedNode: (nodeId, linkedNodeId) => {
    set({
      linkedNodes: {
        ...get().linkedNodes,
        [nodeId]: [...(get().linkedNodes[nodeId] || []), linkedNodeId],
      },
    });
  },

  setLinkedNodes: (nodes) => set({ linkedNodes: nodes }),

  updateNode: (node) => {
    const updatedNodes = get().nodes.map((n) => (n.id === node.id ? node : n));
    set({ nodes: updatedNodes });
  },
  updateNodes: (nodes) => {
    const updatedNodes = get().nodes.map((n) => nodes.find((node) => node.id === n.id) || n);

    set({ nodes: updatedNodes });
  },

  setEdges: (edges) => set({ edges }),
  addEdge: (edge) => set({ edges: [...get().edges, edge] }),
  addEdges: (edges) => set({ edges: [...get().edges, ...edges] }),

  removeNode: (id) => {
    const updatedNodes = get().nodes.filter((node) => node.id !== id);
    const updatedEdges = get().edges.filter((edge) => edge.source !== id && edge.target !== id);

    const updatedLinkedNodes = Object.fromEntries(Object.entries(get().linkedNodes).filter(([key]) => key !== id));

    Object.keys(updatedLinkedNodes).forEach((key) => {
      if (updatedLinkedNodes[key]?.length > 0) {
        updatedLinkedNodes[key] = updatedLinkedNodes[key].filter((id) => id !== id);
      }
    });

    set({ nodes: updatedNodes, edges: updatedEdges, linkedNodes: updatedLinkedNodes });
  },
  removeNodes: (ids) => {
    const updatedNodes = get().nodes.filter((node) => !ids.includes(node.id));
    const updatedEdges = get().edges.filter((edge) => !ids.includes(edge.source) && !ids.includes(edge.target));

    const updatedLinkedNodes = Object.fromEntries(Object.entries(get().linkedNodes).filter(([key]) => !ids.includes(key)));

    Object.keys(updatedLinkedNodes).forEach((key) => {
      if (updatedLinkedNodes[key]?.length > 0) {
        updatedLinkedNodes[key] = updatedLinkedNodes[key].filter((id) => !ids.includes(id));
      }
    });

    set({ nodes: updatedNodes, edges: updatedEdges, linkedNodes: updatedLinkedNodes });
  },

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

  setHiddenNodes: (nodes) => set({ hiddenNodes: nodes }),

  clear: () => set(DEFAULT_VALUE),
}));

export default useStudioFlowStore;
