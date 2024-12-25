import { Active, DataRef } from '@dnd-kit/core';
import { Node } from '@xyflow/react';
import { FunctionComponent } from 'react';
import { DataSchema, StudioCategoryOption } from './category';

type Metadata = Record<string, unknown> &
  Active & {
    nodeId: string;
    option: StudioCategoryOption;
    data: DataRef & {
      current?: Record<string, unknown> & {
        data?: DataSchema;
      };
    };
    children: StudioCategoryOption[];
  };

export type StudioNode = Node<{
  sourceHandles: string[];
  targetHandles: string[];
  metadata: Metadata;
}>;

export type StudioDataKeyMapperType = string;
export type StudioDataNode = {
  id: string;
  keyMapper: string;
  title: React.ReactNode | FunctionComponent;
  children: StudioDataNode[];
  data?: Record<string, unknown>; // this field can be used to store additional data or form input data
};
