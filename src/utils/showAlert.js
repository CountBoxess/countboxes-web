import { useAlertStore } from '../store/useAlertStore.js';

export const showAlert = (options) => {
  useAlertStore.setState((state) => ({
    alert: { ...state.alert, ...options, open: true }
  }));
};
