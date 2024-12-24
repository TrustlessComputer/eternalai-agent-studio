import { Node } from '@xyflow/react';
import { NodeType } from 'enums/node-type';
import { FunctionComponent } from 'react';

export type StudioNode = Node<{
  title: string;
  sourceHandles: string[];
  targetHandles: string[];
  metadata: any | Record<string, unknown>;
}>;

/**
 * Node visual type
 * @typedef {('Baseplate' | 'Slot' | 'Form')} NodeVisualType
 * Baseplate => this is the base node => combination of slot and form
 * Slot => it like a brick in the wall that can be connected to other nodes
 * Form => this is the form node
 */
export type StudioDataKeyMapperType = string;
export type StudioDataNode = {
  id: string;
  keyMapper: StudioDataKeyMapperType;
  title: React.ReactNode | FunctionComponent;
  children: StudioDataNode[];
  nodeVisualType: NodeType;
  data?: Record<string, unknown>; // this field can be used to store additional data or form input data
};
