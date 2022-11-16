import ReactLoading from 'react-loading';

type LoaderProps = {
  color?: string;
  displayText?: string;
};

export default function Loader({ color = '#75bfff', displayText = '' }: LoaderProps): JSX.Element {
  return (
    <div className={'vbox pack text-center'}>
      <ReactLoading type="spin" color={color} />
      <div className="space(14)"></div>
      <span className="c(black) opacity(0.5)">{displayText}</span>
    </div>
  );
}
