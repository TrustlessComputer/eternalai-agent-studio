import { Node } from '@xyflow/react';
import { FunctionComponent } from 'react';

export type StudioNode = Node<{
  sourceHandles: string[];
  targetHandles: string[];
  metadata: unknown | Record<string, unknown>;
}>;

export type StudioDataKeyMapperType = string;
export type StudioDataNode = {
  id: string;
  keyMapper: string;
  title: React.ReactNode | FunctionComponent;
  children: StudioDataNode[];
  data?: Record<string, unknown>; // this field can be used to store additional data or form input data
};
