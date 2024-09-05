import { create } from 'zustand';

export const useAlertStore = create((set) => ({
  alert: {
    type: 'success',
    open: false,
    message: ''
  },
  closeAlert: () => {
    set((state) => ({
      alert: { ...state.alert, open: false }
    }));
  }
}));
