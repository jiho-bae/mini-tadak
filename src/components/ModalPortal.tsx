import { createPortal } from 'react-dom';

type ModalPortalProps = {
  children: JSX.Element | string;
};

export default function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  return createPortal(children, modalRoot);
}
