import { NotificationType } from '@/enums/notification';

export type FlowView = {
  x: number;
  y: number;
  zoom: number;
};

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  multiple?: boolean;
  onClose?: () => void;
};
