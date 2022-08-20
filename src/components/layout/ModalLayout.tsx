import React from 'react';
import { MODAL } from 'src/utils/styleConstant';
import { ModalPortal } from 'src/components/portal';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClickBlackBackground: () => void;
}

const modalContainerStyle = `w(100%) top(0) block`;
const blackBackgroundStyle = `w(100vw) h(100vh) top(0) left(0) absolute bg(rgba(0,0,0,0.7))`;
const contentStyle = `pack p(5rem/5rem/4rem/5rem) w(${MODAL.width}) h${MODAL.height} top(30vh) left(25vw) absolute bg(white) r(10)`;
const contentInputStyle = ' .modal-input:c(red)';
const titleStyle = `font(2.4rem) bold text-center`;

const Modal = ({ onClickBlackBackground, children, title }: ModalProps): JSX.Element => {
  const onClickContent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();

  return (
    <ModalPortal>
      <div className={modalContainerStyle}>
        <div className={blackBackgroundStyle} onClick={onClickBlackBackground}>
          <div className={contentStyle + contentInputStyle} onClick={onClickContent}>
            {title && <h4 className={titleStyle}>{title}</h4>}
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
