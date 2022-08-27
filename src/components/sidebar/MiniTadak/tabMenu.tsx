import Tab from 'src/components/common/Tab';

import { TabNames } from 'src/utils/constant';

interface TabMenuProps {
  tabState: {
    isChat: boolean;
    isParticipant: boolean;
  };
  onClickChatTab: () => void;
  onClickParticipantTab: () => void;
}

export default function MiniTadakSideBarTabMenu({ tabState, onClickChatTab, onClickParticipantTab }: TabMenuProps) {
  const { isChat, isParticipant } = tabState;

  return (
    <div className="hbox">
      <Tab text={TabNames.chat} isActive={isChat} onClick={onClickChatTab} />
      <Tab text={TabNames.participant} isActive={isParticipant} onClick={onClickParticipantTab} />
    </div>
  );
}
