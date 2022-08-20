export type ToastMessageType = 'success' | 'error' | 'easterEgg' | 'easterEggRoom';

export type ToastType = {
  id: string;
  message: string;
  type: ToastMessageType;
};

export type ToastActionType = { type: 'ADD_TOAST'; toast: ToastType } | { type: 'DELETE_TOAST'; id: string };
