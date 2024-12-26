import { create } from 'zustand';

import { Notification } from '@/modules/Studio/types/ui';

type State = {
  notifications: Notification[];
  notify: (notification: Notification) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const useStudioFlowNotificationStore = create<State>((set) => ({
  notifications: [],

  notify: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),

  remove: (id) => set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),

  clear: () => set({ notifications: [] }),
}));

export default useStudioFlowNotificationStore;
