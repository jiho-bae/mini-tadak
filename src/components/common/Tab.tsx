export interface TabProps {
  text?: string;
  isActive: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const tabStyle = `w(25%) font(1.8rem) p(10) text-center pointer bg(transparent) hover:bg(grey)`;
const activeTabStyle = ` bb(3px/solid/#0984E3)`;

const Tab = ({ text, isActive, onClick, children }: TabProps): JSX.Element => (
  <div onClick={onClick} className={tabStyle + (isActive ? activeTabStyle : '')}>
    {text}
    {children}
  </div>
);

export default Tab;
