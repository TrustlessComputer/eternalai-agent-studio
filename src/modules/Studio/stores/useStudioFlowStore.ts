import { addEdge, applyEdgeChanges, applyNodeChanges, Edge, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';
import { create } from 'zustand';

import { StudioNode } from '../types/graph';

const DEFAULT_VALUE = {
  reloadFlowCounter: 0,
  nodes: [],
  edges: [],
  hiddenNodes: [],
};

type Store = {
  reloadFlowCounter: number;
  reloadFlow: () => void;

  nodes: StudioNode[];
  setNodes: (nodes: StudioNode[]) => void;
  addNode: (node: StudioNode) => void;
  addNodes: (nodes: StudioNode[]) => void;

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

    set({ nodes: updatedNodes, edges: updatedEdges });
  },
  removeNodes: (ids) => {
    const updatedNodes = get().nodes.filter((node) => !ids.includes(node.id));
    const updatedEdges = get().edges.filter((edge) => !ids.includes(edge.source) && !ids.includes(edge.target));

    set({ nodes: updatedNodes, edges: updatedEdges });
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
