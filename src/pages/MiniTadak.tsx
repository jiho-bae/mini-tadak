import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import AgoraVideoCardList from 'src/components/agora/VideoCardList';
import VideoController from 'src/components/agora/VideoController';
import Loader from 'src/components/Loader';

import { userState } from 'src/hooks/recoil/user/atom';
import { getMicrophoneAndCameraTracks } from 'src/agora/config';
import useAgora from 'src/hooks/useAgora';
import { PAGE_NAME } from 'src/utils/constant';
import { RoomType } from 'src/types';
import MiniTadakSideBar from 'src/components/sidebar/MiniTadak';
import useToggle from 'src/hooks/useToggle';

type LocationStateType = {
  state: RoomType;
};

export default function MiniTadak() {
  const {
    state: { agoraAppId, agoraToken, uuid, owner },
  } = useLocation() as LocationStateType;
  const userInfo = useRecoilValue(userState);
  const { ready, tracks } = getMicrophoneAndCameraTracks();
  const agoraOptions = { userInfo, ready, tracks, agoraAppId, agoraToken, uuid, agoraType: PAGE_NAME.tadak };
  const { agoraUsers, isStreaming, toggleIsStreaming } = useAgora(agoraOptions);
  const [isSideBar, toggleIsSideBar] = useToggle(false);

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
          <MiniTadakSideBar isSideBar={isSideBar} />
          <VideoController
            tracks={tracks}
            toggleIsStreaming={toggleIsStreaming}
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
