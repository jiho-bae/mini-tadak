import { createPortal } from 'react-dom';

type ToastPortalProps = {
  children: JSX.Element[] | JSX.Element | string;
};

export default function ToastPortal({ children }: ToastPortalProps) {
  const toastRoot = document.getElementById('toast-root') as HTMLElement;

  return createPortal(children, toastRoot);
}
