import useToggle from '../hooks/useToggle';
import RectButton from './common/RectButton';
import MakeRoom from './MakeRoom';

type HeaderProps = {
  userId: string | undefined;
  onClickLogOut: () => void;
};

export default function Header({ userId, onClickLogOut }: HeaderProps): JSX.Element {
  const [onModal, toggleOnModal] = useToggle(false);

  return (
    <nav className="position(fixed) w(100%) top(0) left(0) p(15)">
      <ul className="hbox w(100%)">
        <li>ν π </li>
        <li className="flex"></li>
        <li>
          λ°κ°μ΅λλ€! <span className="c(#0984e3) bold">{userId}</span> λ{' '}
        </li>
        <li className="space(30)"></li>
        <li>
          <RectButton onClick={toggleOnModal} buttonName="λ°© λ§λ€κΈ°" />
        </li>
        <li className="space(30)"></li>
        <li>
          <button onClick={onClickLogOut}>λ‘κ·Έμμ</button>
        </li>
      </ul>
      {onModal && <MakeRoom onClickBlackBackground={toggleOnModal} userId={1} />}
    </nav>
  );
}
