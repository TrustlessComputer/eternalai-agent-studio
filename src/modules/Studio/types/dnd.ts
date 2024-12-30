export type DraggableDataType = {
  type: DndType;
  categoryKey?: string;
  optionKey?: string;
  belongsTo?: string;
  childIndex?: number;
};

export enum DndType {
  FACTORY = 'factory',
  SOURCE = 'source',
  PRODUCT = 'product',
  PRODUCT_ADDON = 'product_addon',
  ADDON = 'addon',
  PACKAGE = 'package',
  DISTRIBUTION = 'distribution',
}
