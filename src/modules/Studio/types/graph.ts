import { Node } from '@xyflow/react';
import { FunctionComponent } from 'react';

export type StudioNode = Node<{
  title: string;
  sourceHandles: string[];
  targetHandles: string[];
  metadata: Record<string, unknown>;
}>;

/**
 * Node visual type
 * @typedef {('Baseplate' | 'Slot' | 'Form')} NodeVisualType
 * Baseplate => this is the base node => combination of slot and form
 * Slot => it like a brick in the wall that can be connected to other nodes
 * Form => this is the form node
 */
export type NodeVisualType = 'Baseplate' | 'Slot' | 'Form';

export type StudioDataNode = {
  id: string;
  keyMapper: string;
  title: React.ReactNode | FunctionComponent;
  children: StudioDataNode[];
  nodeVisualType: NodeVisualType;
  data?: Record<string, unknown>; // this field can be used to store additional data or form input data
};
