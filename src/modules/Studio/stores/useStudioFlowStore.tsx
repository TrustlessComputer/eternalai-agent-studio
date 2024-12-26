import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';
import { create } from 'zustand';

import { StudioNode } from '../types/graph';

type State = {
  reloadFlowCounter: number;
  reloadFlow: () => void;

  nodes: StudioNode[];
  setNodes: (nodes: StudioNode[]) => void;
  addNode: (node: StudioNode) => void;
  addNodes: (nodes: StudioNode[]) => void;

  updateNode: (node: StudioNode) => void;
  // updateNodes: (node: StudioNode) => void;

  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  addEdge: (edge: Edge) => void;
  addEdges: (edges: Edge[]) => void;

  removeNode: (id: string) => void;
  removeNodes: (ids: string[]) => void;

  onNodesChange: OnNodesChange<StudioNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  clear: () => void;
};

const flatNodes = (nodes: StudioNode[]) => {
  return {
    nodes,
  };
};

const flatEdges = (edges: Edge[]) => {
  const edgesMapped: Record<string, Edge> = {};
  edges.forEach((edge) => {
    edgesMapped[edge.id] = edge;
  });

  return {
    edgesMapped,
    edges,
  };
};

const useStudioFlowStore = create<State>((set, get) => ({
  reloadFlowCounter: 0,
  reloadFlow: () => {
    set({ reloadFlowCounter: get().reloadFlowCounter + 1 });
  },

  nodes: [],
  nodesMapped: {},
  setNodes: (nodes) => set({ ...flatNodes(nodes) }),
  addNode: (node) => set({ ...flatNodes([...get().nodes, node]) }),
  addNodes: (nodes) => set({ ...flatNodes([...get().nodes, ...nodes]) }),

  updateNode: (node) => {
    const updatedNodes = get().nodes.map((n) => (n.id === node.id ? node : n));
    set({ ...flatNodes(updatedNodes) });
  },
  // updateNodes: (nodes) => {
  //   const updatedNodes = get().nodes.map((n) => {
  //     const found = nodes.find((node) => node.id === n.id);

  //     return found ? found : n;
  //   });

  //   set({ ...flatNodes(updatedNodes) });
  // },

  edges: [],
  edgesMapped: {},
  setEdges: (edges) => set({ ...flatEdges(edges) }),
  addEdge: (edge) => set({ ...flatEdges([...get().edges, edge]) }),
  addEdges: (edges) => set({ ...flatEdges([...get().edges, ...edges]) }),

  removeNode: (id) => {
    const updatedNodes = get().nodes.filter((node) => node.id !== id);
    const updatedEdges = get().edges.filter((edge) => edge.source !== id && edge.target !== id);

    set({ ...flatNodes(updatedNodes), ...flatEdges(updatedEdges) });
  },
  removeNodes: (ids) => {
    const updatedNodes = get().nodes.filter((node) => !ids.includes(node.id));
    const updatedEdges = get().edges.filter((edge) => !ids.includes(edge.source) && !ids.includes(edge.target));

    set({ ...flatNodes(updatedNodes), ...flatEdges(updatedEdges) });
  },

  onNodesChange: (changes) => {
    set({
      ...flatNodes(applyNodeChanges(changes, get().nodes)),
    });
  },
  onEdgesChange: (changes) => {
    set({
      ...flatEdges(applyEdgeChanges(changes, get().edges)),
    });
  },
  onConnect: (connection) => {
    set({
      ...flatEdges(addEdge(connection, get().edges)),
    });
  },

  clear: () => {
    set({ reloadFlowCounter: 0, nodes: [], edges: [] });
  },
}));

export default useStudioFlowStore;
