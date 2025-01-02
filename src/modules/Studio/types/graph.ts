import { Node, XYPosition } from '@xyflow/react';
import { FunctionComponent } from 'react';
import { FormDataMap, Key } from './base';

export type StudioNodeMetadata = Record<string, unknown> & {
  children: StudioNode[];
  key: Key;
};

export type StudioNode = Node<{
  sourceHandles: string[];
  targetHandles: string[];
  id: string;
  metadata: StudioNodeMetadata;
}>;

export type StudioDataNode = {
  id: string;
  key: Key;
  title: React.ReactNode | FunctionComponent;
  children: StudioDataNode[];
  data?: FormDataMap; // this field can be used to store additional data or form input data
  rect?: {
    position: XYPosition;
  };
};
