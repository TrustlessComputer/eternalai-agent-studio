import { ConnectionMode, ReactFlowProps } from '@xyflow/react';

export const DEFAULT_FLOW_PROPS: ReactFlowProps = {
  edgesFocusable: false,
  deleteKeyCode: '',
  defaultViewport: { x: 0, y: 0, zoom: 1 },
  onViewportChange: () => {},
  fitViewOptions: { padding: 1 },
  connectionMode: ConnectionMode.Loose,
  zoomOnDoubleClick: false,
  selectNodesOnDrag: false,
  disableKeyboardA11y: true,
  minZoom: 1,
  maxZoom: 1,
};
