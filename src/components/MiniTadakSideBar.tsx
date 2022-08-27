import SidebarLayout from './layout/SideBarLayout';

interface MiniTadakSideBarProps {
  isSideBar: boolean;
}

export default function MiniTadakSideBar({ isSideBar }: MiniTadakSideBarProps) {
  const topMenus = <div>hello</div>;
  const bottomMenus = <div>hello2</div>;

  if (!isSideBar) {
    return <></>;
  }

  return <SidebarLayout topMenus={topMenus} bottomMenus={bottomMenus} />;
}
