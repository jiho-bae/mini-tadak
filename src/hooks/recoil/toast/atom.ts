import { atom } from 'recoil';
import { ToastType } from '../../../types';

export const toastState = atom<ToastType[]>({
  key: 'toastState',
  default: [],
});
