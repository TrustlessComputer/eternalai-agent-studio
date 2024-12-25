import { Active, DataRef } from '@dnd-kit/core';
import { Node, XYPosition } from '@xyflow/react';
import { FunctionComponent } from 'react';
import { DataSchema, StudioCategory, StudioCategoryOption } from './category';
import { FormDataType, KeyMapperType } from './base';

export type StudioNodeMetadata = Record<string, unknown> &
  Active & {
    nodeId: string;
    category: StudioCategory;
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
  metadata: StudioNodeMetadata;
}>;

export type StudioDataKeyMapperType = string;
export type StudioDataNode = {
  id: string;
  keyMapper: KeyMapperType;
  title: React.ReactNode | FunctionComponent;
  children: StudioDataNode[];
  data?: FormDataType; // this field can be used to store additional data or form input data
  rect?: {
    position: XYPosition;
  };
};
