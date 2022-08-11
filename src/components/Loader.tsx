import ReactLoading from 'react-loading';

type LoaderProps = {
  isWholeScreen?: boolean;
  color?: string;
};

export default function Loader({ isWholeScreen = false, color = '#75bfff' }: LoaderProps): JSX.Element {
  return (
    <div className={'w(100%) h(20%) text-center ' + isWholeScreen && 'fixed top(0) left(0) height(100%)'}>
      <ReactLoading type="spin" color={color} />
    </div>
  );
}
