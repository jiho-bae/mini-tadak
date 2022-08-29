import SidebarLayout from 'src/components/layout/SideBarLayout';
import TabMenu from './tabMenu';
import TabContent from './tabContent';
import { useCallback, useState } from 'react';

interface MiniTadakSideBarProps {
  isSideBar: boolean;
  uuid: string;
}

const initialTabState = {
  isChat: false,
  isParticipant: true,
};

export default function MiniTadakSideBar({ isSideBar, uuid }: MiniTadakSideBarProps) {
  const [tabState, setTabState] = useState(initialTabState);

  const onClickParticipantTab = useCallback(() => {
    setTabState({ isChat: false, isParticipant: true });
  }, []);

  const onClickChatTab = useCallback(() => {
    setTabState({ isChat: true, isParticipant: false });
  }, []);

  if (!isSideBar) {
    return <></>;
  }

  return (
    <SidebarLayout
      tabMenu={
        <TabMenu tabState={tabState} onClickParticipantTab={onClickParticipantTab} onClickChatTab={onClickChatTab} />
      }
      tabContent={<TabContent tabState={tabState} uuid={uuid} />}
    />
  );
}
