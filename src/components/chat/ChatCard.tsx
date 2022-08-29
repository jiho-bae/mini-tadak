import React from 'react';

import { chatTimeFormatting } from 'src/utils/utils';
import { ChatType } from 'src/types';

const chatCardContainerStyle = `vbox bg(transparent) p(5) r(10) overflow-x(hidden)`;
const chatTitleStyle = `space-between`;
const chatNicknameStyle = `bold font-size(1.8rem)`;
const chatTimeStyle = `c(#636e72) font-size(1rem)`;
const chatMessageStyle = `w(19rem) ml(1rem) font-size(1.6rem) overflow(hidden)`;

interface ChatProps {
  chat: ChatType;
}

const ChatCard = React.memo(({ chat }: ChatProps): JSX.Element => {
  const { time, nickname, message } = chat;
  const chatTime = chatTimeFormatting(time);

  return (
    <div className={chatCardContainerStyle}>
      <div className={chatTitleStyle}>
        <span className={chatNicknameStyle}>{nickname ?? 'Anonymous'} </span>
        <span className={chatTimeStyle}>{chatTime}</span>
      </div>
      <p className={chatMessageStyle}>{message}</p>
    </div>
  );
});

export default ChatCard;
