export type DraggableDataType = {
  type: DndType;
  categoryId?: string;
  optionId?: string;
  nodeId?: string;
};

export enum DndType {
  FACTORY = 'factory',
  SOURCE = 'source',
  PRODUCT = 'product',
  PACKAGE = 'package',
  DISTRIBUTION = 'distribution',
}
