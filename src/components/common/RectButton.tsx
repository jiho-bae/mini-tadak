type RectButtonProps = {
  buttonName: string;
  onClick?: () => void;
  w?: string;
  h?: string;
};

export default function RectButton({ buttonName, onClick, w = '', h = '' }: RectButtonProps) {
  const buttonStyle = 'p(5) r(5) bg(#ff6348) hover:bg(#70a1ff) c(white) text-center ' + `w(${w}) h(${h})`;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {buttonName}
    </button>
  );
}
