export type BoardConfig = {
  minZoom?: number;
  maxZoom?: number;
  fitViewOptions?: {
    padding?: number;
  };

  disabledConnection?: boolean;
  disabledZoom?: boolean;
  disabledMiniMap?: boolean;
  disabledControls?: boolean;
  disabledBackground?: boolean;
};
