import { useState } from 'react';
import ChatList from 'src/components/chat/ChatList';
import { ChatType } from 'src/types';

interface TabContentProps {
  uuid: string;
  tabState: {
    isChat: boolean;
    isParticipant: boolean;
  };
}

export default function MiniTadakTabContent({ tabState, uuid }: TabContentProps) {
  const { isChat, isParticipant } = tabState;
  const [chats, setChats] = useState<Array<ChatType>>([]);

  return (
    <>
      {isChat && <ChatList chats={chats} uuid={uuid} setChats={setChats} />}
      {isParticipant && <div>participant</div>}
    </>
  );
}
