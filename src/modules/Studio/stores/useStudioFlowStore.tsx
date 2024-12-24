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
  nodes: StudioNode[];
  nodesMapped: Record<string, StudioNode>;
  edges: Edge[];
  edgesMapped: Record<string, Edge>;

  disabledZoom: boolean;

  setNodes: (nodes: StudioNode[]) => void;
  setEdges: (edges: Edge[]) => void;

  getNode: (id: string) => StudioNode | undefined;
  getEdge: (id: string) => Edge | undefined;

  getNodes: (ids: string[]) => StudioNode[];
  getEdges: (ids: string[]) => Edge[];

  removeNode: (id: string) => void;
  removeNodes: (ids: string[]) => void;

  disableZoom: () => void;
  enableZoom: () => void;

  onNodesChange: OnNodesChange<StudioNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

const flatNodes = (nodes: StudioNode[]) => {
  const nodesMapped: Record<string, StudioNode> = {};
  nodes.forEach((node) => {
    nodesMapped[node.id] = node;
  });

  return {
    nodesMapped,
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
  nodes: [],
  nodesMapped: {},
  setNodes: (nodes) => set({ ...flatNodes(nodes) }),

  edges: [],
  edgesMapped: {},
  setEdges: (edges) => set({ ...flatEdges(edges) }),

  getNode: (id) => get().nodesMapped[id],
  getEdge: (id) => get().edgesMapped[id],

  getNodes: (ids) => {
    const nodesMapped = get().nodesMapped;

    return ids.map((id) => nodesMapped[id]);
  },
  getEdges: (ids) => {
    const edgesMapped = get().edgesMapped;

    return ids.map((id) => edgesMapped[id]);
  },

  removeNode: (id) => {
    const updatedNodes = get().nodes.filter((node) => node.id !== id);
    set({ ...flatNodes(updatedNodes) });
  },
  removeNodes: (ids) => {
    const updatedNodes = get().nodes.filter((node) => !ids.includes(node.id));
    set({ ...flatNodes(updatedNodes) });
  },

  disabledZoom: false,
  disableZoom: () => set({ disabledZoom: true }),
  enableZoom: () => set({ disabledZoom: false }),

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
}));

export default useStudioFlowStore;
