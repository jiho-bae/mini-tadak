interface SideBarProps {
  tabMenu: React.ReactNode;
  tabContent: React.ReactNode;
}

const containerStyle = `w(25rem) h(100vh) p(10) bg(#dff9fb) bl(1px/#ecf0f1)`;
const tabMenuStyle = ``;
const tabContentStyle = ``;

const SideBar = ({ tabMenu, tabContent }: SideBarProps): JSX.Element => {
  return (
    <div className={containerStyle}>
      <div className={tabMenuStyle}>{tabMenu}</div>
      <div className={tabContentStyle}>{tabContent}</div>
    </div>
  );
};

export default SideBar;
