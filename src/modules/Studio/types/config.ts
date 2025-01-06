import { SidebarSide } from '../enums/side';
import { TabBehavior } from '../enums/tab';

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

export type StudioConfig = {
  sidebarSide: SidebarSide;
  tabBehavior: TabBehavior;
  boardConfig: BoardConfig;
};
