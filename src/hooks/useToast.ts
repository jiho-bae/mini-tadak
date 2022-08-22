import { useCallback } from 'react';
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

  const toast = useCallback(
    function (type: ToastMessageType, message: string) {
      const id = Math.random().toString(36).substr(2, 9);
      const toastMessage = { type, message, id };

      setToastMessage(addToast(toastMessage));

      setTimeout(() => {
        setToastMessage(delToast(id));
      }, delay);
    },
    [delay, setToastMessage],
  );

  const successToast = useCallback(
    function (message: string) {
      toast('success', message);
    },
    [toast],
  );

  const errorToast = useCallback(
    function (message: string) {
      toast('error', message);
    },
    [toast],
  );

  return { successToast, errorToast };
}
