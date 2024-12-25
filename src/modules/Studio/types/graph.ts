import { Node } from '@xyflow/react';
import { FunctionComponent } from 'react';
import { StudioCategoryItem } from './category';

export type StudioNode = Node<{
  sourceHandles: string[];
  targetHandles: string[];
  metadata: {
    option: StudioCategoryItem;
    nodeId: string;
  };
}>;

export type StudioDataKeyMapperType = string;
export type StudioDataNode = {
  id: string;
  keyMapper: string;
  title: React.ReactNode | FunctionComponent;
  children: StudioDataNode[];
  data?: Record<string, unknown>; // this field can be used to store additional data or form input data
};
