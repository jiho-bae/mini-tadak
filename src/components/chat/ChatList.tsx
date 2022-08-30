import React, { useCallback, useEffect, useRef } from 'react';
import { TiDelete } from 'react-icons/ti';

import ChatCard from './ChatCard';

import socket from 'src/services/socket';
import { SocketEvents } from 'src/services/socket/socketEvents';
import { INPUT, PLACEHOLDER_TXT, KEY_PRESS } from 'src/utils/constant';
import useInput from 'src/hooks/useInput';
import { userState } from 'src/hooks/recoil/user/atom';
import { useRecoilValue } from 'recoil';
import { UserType } from 'src/types';
import { ChatType } from 'src/types';
import { isScrollable } from 'src/utils/guard';

interface ChatListProps {
  chats: Array<ChatType>;
  uuid: string;
  roomType?: string;
  setChats: React.Dispatch<React.SetStateAction<Array<ChatType>>>;
}

const chatCardContainerStyle = `w(100%) h(100%) vbox gap(2rem)`;
const chatUlStyle = `w(100%) vbox p(5) overflow(auto) @w(~1065):h(70vh) h(80vh)`;
const textAreaWrapperStyle = `relative w(100%) vbox z(10)`;
const textAreaStyle = `w(23rem) h(6rem) size(1.8rem) p(5) r(5) bg(transparent)`;
const lineStyle = `w(23rem) bt(1px/black) opacity(0.4) m(0/auto)`;
const textResetStyle = `absolute bottom(1rem) right(1rem)`;

const TextResetBtnStyle = {
  fill: 'grey',
  opacity: 0.7,
  fontSize: '2.2rem',
  cursor: 'pointer',
};

const ChatList = ({ uuid, chats, setChats, roomType }: ChatListProps): JSX.Element => {
  const user = useRecoilValue(userState) as UserType;
  const { nickname } = user;
  const [message, onChangeMessage, onResetMessage] = useInput('');
  const ulRef = useRef<HTMLUListElement>(null);
  const firstRender = useRef(true);
  const scrollRef = useRef(true);

  const sendMessage = useCallback(() => {
    if (!message) return;
    const myMessage = { type: 'string', nickname: nickname as string, message, uuid };
    scrollRef.current = true;

    socket.emitEvent(SocketEvents.sendMsg, myMessage);
    onResetMessage();
  }, [onResetMessage, nickname, message, uuid]);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === KEY_PRESS.enter) {
        if (!e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }
    },
    [sendMessage],
  );

  const onScrollMove = useCallback(() => {
    const { clientHeight, scrollTop, scrollHeight } = ulRef.current as HTMLUListElement;

    if (!isScrollable(clientHeight, scrollTop, scrollHeight)) {
      scrollRef.current = false;
      return;
    }
    scrollRef.current = true;
  }, []);

  const handleMessageReceive = useCallback(
    (chat: ChatType) => {
      setChats((prevState) => [...prevState, chat]);
    },
    [setChats],
  );

  useEffect(() => {
    socket.removeListenEvent(SocketEvents.receiveMsg);
    socket.listenEvent(SocketEvents.receiveMsg, handleMessageReceive);
  }, [handleMessageReceive]);

  useEffect(() => {
    const ulDomRef = ulRef.current as HTMLUListElement;

    if (firstRender.current) {
      firstRender.current = false;
      ulDomRef.scrollTop = ulDomRef.scrollHeight;
      return;
    }

    if (scrollRef.current) {
      ulDomRef.scrollTop = ulDomRef.scrollHeight;
    }
  }, [chats]);

  return (
    <div className={chatCardContainerStyle}>
      <ul className={chatUlStyle} ref={ulRef} onScroll={onScrollMove}>
        {chats.length > 0 && chats.map((chat, idx) => <ChatCard key={idx} chat={chat} />)}
      </ul>
      <div className={lineStyle} />
      <div className="flex" />
      <div className={textAreaWrapperStyle}>
        <textarea
          className={textAreaStyle}
          placeholder={PLACEHOLDER_TXT.chat}
          value={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
          maxLength={INPUT.chatMaxLen}
        />
        {message && (
          <span className={textResetStyle}>
            <TiDelete style={TextResetBtnStyle} onClick={onResetMessage} />
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatList;
