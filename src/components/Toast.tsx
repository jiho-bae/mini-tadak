import { useRecoilValue } from 'recoil';
import { IoMdClose } from 'react-icons/io';

import { ToastPortal } from './portal';
import { toastState } from 'src/hooks/recoil/toast/atom';
import { TOAST } from 'src/utils/styleConstant';

const toastContainerStyle = `absolute pack bg(transparent) w(${TOAST.width}) left(40vw) top(${TOAST.topPosition}) z(100) r(10)`;
const toastMessageStyle = `relative pack w(${TOAST.width}) p(5rem) r(10) c(white) font(1.8rem)`;
const successBgStyle = ' bg(#01a3a4)';
const errorBgStyle = ' bg(#ff6b6b)';

function getBgStyle(type: string) {
  return type === 'success' ? successBgStyle : errorBgStyle;
}

export default function Toast(): JSX.Element {
  const toasts = useRecoilValue(toastState);

  return (
    <ToastPortal>
      {toasts &&
        toasts.map(({ type, id, message }) => {
          const bgStyle = getBgStyle(type);

          return (
            <div key={id} className={toastContainerStyle + bgStyle} id="toast-fadeInOut">
              <div className={toastMessageStyle}>
                <div>{message}</div>
                <IoMdClose className="button" fill="white" />
              </div>
            </div>
          );
        })}
    </ToastPortal>
  );
}
