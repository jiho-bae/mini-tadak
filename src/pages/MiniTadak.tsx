import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import AgoraVideoCardList from 'src/components/agora/VideoCardList';
import VideoController from 'src/components/agora/VideoController';
import MiniTadakSideBar from 'src/components/sidebar/MiniTadak';
import Loader from 'src/components/Loader';

import { userState } from 'src/hooks/recoil/user/atom';
import { getClient, getMicrophoneAndCameraTracks } from 'src/agora/config';
import useToggle from 'src/hooks/useToggle';
import useAgora from 'src/hooks/useAgora';
import socket from 'src/services/socket';
import { postLeaveRoom } from 'src/apis';
import { SocketEvents } from 'src/services/socket/socketEvents';
import { PAGE_NAME } from 'src/utils/constant';
import { RoomType } from 'src/types';
import { participantState } from 'src/hooks/recoil/participant/atom';
import ParticipantType from 'src/types/participant';
import { isTracks } from 'src/utils/guard';

type LocationStateType = {
  state: RoomType;
};

export default function MiniTadak() {
  const {
    state: { agoraAppId, agoraToken, uuid, owner, maxHeadcount: maxHead },
  } = useLocation() as LocationStateType;
  const userInfo = useRecoilValue(userState);
  const setParticipants = useSetRecoilState(participantState);
  const { ready, tracks } = getMicrophoneAndCameraTracks();
  const agoraOptions = { userInfo, ready, tracks, agoraAppId, agoraToken, uuid, agoraType: PAGE_NAME.tadak };
  const { agoraUsers, isStreaming } = useAgora(agoraOptions);
  const client = getClient();
  const [isSideBar, toggleIsSideBar] = useToggle(false);

  const updateParticipants = useCallback(
    (userList: { [key: string]: ParticipantType }) => {
      setParticipants({ ...userList });
    },
    [setParticipants],
  );

  const leaveSocketRoom = useCallback(() => {
    socket.emitEvent(SocketEvents.leaveRoom, { uuid });
    socket.clearAllListener();

    postLeaveRoom(uuid);
  }, [uuid]);

  const leaveAgoraChannel = useCallback(async () => {
    await client.leave();
    client.removeAllListeners();

    if (!isTracks(tracks)) return;
    tracks[0].close();
    tracks[1].close();
  }, [client, tracks]);

  const joinSocketRoom = useCallback(() => {
    if (!userInfo.nickname) return;

    const { nickname, devField, imageUrl } = userInfo;
    const socketJoinPayload = {
      nickname: nickname as string,
      uuid,
      field: devField as object,
      img: imageUrl as string,
      maxHead,
    };

    socket.emitEvent(SocketEvents.joinRoom, socketJoinPayload);
    socket.listenEvent(SocketEvents.receiveUserList, updateParticipants);
  }, [userInfo, maxHead, uuid, updateParticipants]);

  useEffect(() => {
    joinSocketRoom();

    return () => {
      leaveSocketRoom();
      leaveAgoraChannel();
    };
  }, [joinSocketRoom, leaveSocketRoom, leaveAgoraChannel]);

  if (!isStreaming) {
    return (
      <div className="w(100%) h(100%) pack">
        <Loader displayText="방에 입장중입니다..." />
      </div>
    );
  }

  return (
    <div className="w(100%) h(100%) hbox">
      {tracks && (
        <>
          <AgoraVideoCardList agoraUsers={agoraUsers} tracks={tracks} isSideBar={isSideBar} />
          <MiniTadakSideBar isSideBar={isSideBar} uuid={uuid} />
          <VideoController
            tracks={tracks}
            isSideBar={isSideBar}
            toggleIsSideBar={toggleIsSideBar}
            uuid={uuid}
            ownerId={owner?.id}
          />
        </>
      )}
    </div>
  );
}
