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
  nodesMapped: Record<string, StudioNode>;
  setNodes: (nodes: StudioNode[]) => void;
  addNode: (node: StudioNode) => void;
  addNodes: (nodes: StudioNode[]) => void;
  getNode: (id: string) => StudioNode | undefined;
  getNodes: (ids: string[]) => StudioNode[];

  edges: Edge[];
  edgesMapped: Record<string, Edge>;
  setEdges: (edges: Edge[]) => void;
  addEdge: (edge: Edge) => void;
  addEdges: (edges: Edge[]) => void;
  getEdge: (id: string) => Edge | undefined;
  getEdges: (ids: string[]) => Edge[];

  removeNode: (id: string) => void;
  removeNodes: (ids: string[]) => void;

  disabledZoom: boolean;
  disableZoom: () => void;
  enableZoom: () => void;

  onNodesChange: OnNodesChange<StudioNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

const flatNodes = (nodes: StudioNode[]) => {
  // const nodesMapped: Record<string, StudioNode> = {};
  // nodes.forEach((node) => {
  //   nodesMapped[node.id] = node;
  // });

  return {
    // nodesMapped,
    nodes,
  };
};

const flatEdges = (edges: Edge[]) => {
  // const edgesMapped: Record<string, Edge> = {};
  // edges.forEach((edge) => {
  //   edgesMapped[edge.id] = edge;
  // });

  return {
    // edgesMapped,
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
  getNode: (id) => get().nodesMapped[id],
  getNodes: (ids) => {
    const nodesMapped = get().nodesMapped;

    return ids.map((id) => nodesMapped[id]);
  },

  edges: [],
  edgesMapped: {},
  setEdges: (edges) => set({ ...flatEdges(edges) }),
  addEdge: (edge) => set({ ...flatEdges([...get().edges, edge]) }),
  addEdges: (edges) => set({ ...flatEdges([...get().edges, ...edges]) }),
  getEdge: (id) => get().edgesMapped[id],
  getEdges: (ids) => {
    const edgesMapped = get().edgesMapped;

    return ids.map((id) => edgesMapped[id]);
  },

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
