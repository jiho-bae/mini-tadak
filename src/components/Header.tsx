type HeaderProps = {
  userId: string | undefined;
  onClickLogOut: () => void;
};

export default function Header({ userId, onClickLogOut }: HeaderProps): JSX.Element {
  return (
    <nav className="position(fixed) w(100%) top(0) left(0) p(15)">
      <ul className="hbox w(100%)">
        <li>홈 🏠</li>
        <li className="flex"></li>
        <li>
          반갑습니다! <span className="c(#0984e3) bold">{userId}</span> 님{' '}
        </li>
        <li className="space(30)"></li>
        <li>
          <button onClick={onClickLogOut}>로그아웃</button>
        </li>
      </ul>
    </nav>
  );
}
