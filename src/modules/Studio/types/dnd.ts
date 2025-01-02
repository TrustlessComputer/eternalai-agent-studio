export type DraggableData = {
  type: DndZone;
  categoryKey?: string;
  optionKey?: string;
  belongsTo?: string;
  childIndex?: number;
  isRoot?: boolean;
};

export enum DndZone {
  FACTORY = 'factory',
  SOURCE = 'source',
  PRODUCT = 'product',
  PRODUCT_ADDON = 'product_addon',
  ADDON = 'addon',
  PACKAGE = 'package',
  DISTRIBUTION = 'distribution',
}
