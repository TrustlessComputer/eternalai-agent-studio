import { StudioCategoryType } from '../enums/category';
import { BoardConfig } from '../types/config';
import { SECOND } from './time';

export const DEFAULT_DISABLED_CONNECTION = false;
export const DEFAULT_CATEGORY_TYPE = StudioCategoryType.INLINE;

export const DEFAULT_THROTTLE_NODES_DELAY = SECOND;
export const DEFAULT_THROTTLE_DATA_DELAY = SECOND / 2;

export const DEFAULT_BOARD_CONFIG: BoardConfig = {
  minZoom: 1,
  maxZoom: 1,
  fitViewOptions: {
    padding: 1,
  },

  disabledConnection: false,
  disabledZoom: false,
  disabledMiniMap: false,
  disabledControls: false,
  disabledBackground: false,
};
