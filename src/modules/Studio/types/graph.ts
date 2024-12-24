import { Node } from '@xyflow/react';
import { Component } from 'react';

export type StudioNode = Node<{
  title: string;
  sourceHandles: string[];
  targetHandles: string[];
  metadata: Record<string, unknown>;
}>;

export type NodeType = 'Baseplate' | 'Slot';

export type StudioDataNode = {
  id: string;
  keyMapper: string;
  title: string | React.ReactNode | Component;
  children: StudioDataNode[];
  type: NodeType;
  order?: number;
};
