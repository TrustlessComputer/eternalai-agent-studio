import { Node } from "@xyflow/react";

export type AgentStudioNode = Node<{
  title: string;
  sourceHandles: string[];
  targetHandles: string[];
  metadata: any;
}>;
