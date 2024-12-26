import { Active, DataRef } from '@dnd-kit/core';
import { Node, XYPosition } from '@xyflow/react';
import { FunctionComponent } from 'react';
import { NodeType } from '../enums/node-type';
import { FormDataType, KeyMapperType } from './base';
import { DataSchema, StudioCategory, StudioCategoryOption } from './category';

export type BaseNodeMetadata = Record<string, unknown> &
  Active & {
    nodeId: string;
    category: StudioCategory;
    option: StudioCategoryOption;
    data: DataRef & {
      current?: Record<string, unknown> & {
        data?: DataSchema;
      };
    };
    children: StudioNode[];
  };

export type ProductNodeMetadata = Record<string, unknown> &
  Active & {
    nodeId: string;
  };

export type BaseNode = {
  // type: NodeType.BASE;
  type: NodeType;
  metadata: BaseNodeMetadata;
};

export type FactoryNode = {
  type: NodeType.FACTORY;
};

export type ProductNode = {
  type: NodeType.PRODUCT;
  metadata?: ProductNodeMetadata;
};

export type StudioNode = Node<
  {
    sourceHandles: string[];
    targetHandles: string[];
    className?: string;
  } & BaseNode
>;

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
