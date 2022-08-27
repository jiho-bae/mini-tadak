interface SideBarProps {
  topMenus: React.ReactNode;
  bottomMenus: React.ReactNode;
}

const containerStyle = `w(25rem) h(100vh) p(10) bg(#dff9fb) bl(1px/#ecf0f1)`;
const topMenuStyle = ``;
const bottomMenuStyle = ``;

const SideBar = ({ topMenus, bottomMenus }: SideBarProps): JSX.Element => {
  return (
    <div className={containerStyle}>
      <div className={topMenuStyle}>{topMenus}</div>
      <div className={bottomMenuStyle}>{bottomMenus}</div>
    </div>
  );
};

export default SideBar;
