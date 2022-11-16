import { useSetRecoilState } from 'recoil';
import { ToastMessageType, ToastType } from '../types';
import { TOAST_TIME } from '../utils/constant';
import { toastState } from './recoil/toast/atom';

type ReturnType = {
  successToast: (message: string) => void;
  errorToast: (message: string) => void;
};

function addToast(toastMessage: ToastType) {
  return (prev: ToastType[]) => [...prev, toastMessage];
}

function delToast(toastId: string) {
  return (prev: ToastType[]) => prev.filter((elem) => elem.id !== toastId);
}

export function useToast(delay = TOAST_TIME): ReturnType {
  const setToastMessage = useSetRecoilState(toastState);

  function toast(type: ToastMessageType, message: string) {
    const id = Math.random().toString(36).substr(2, 9);
    const toastMessage = { type, message, id };

    setToastMessage(addToast(toastMessage));

    setTimeout(() => {
      setToastMessage(delToast(id));
    }, delay);
  }

  function successToast(message: string) {
    toast('success', message);
  }

  function errorToast(message: string) {
    toast('error', message);
  }

  return { successToast, errorToast };
}
