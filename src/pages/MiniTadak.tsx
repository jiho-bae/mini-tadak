import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../hooks/recoil/atom';
import { getMicrophoneAndCameraTracks } from '../agora/config';
import useAgora from '../hooks/useAgora';

import AgoraVideoCardList from '../components/agora/VideoCardList';
import VideoController from '../components/agora/VideoController';
import Loader from '../components/Loader';

import { PAGE_NAME } from '../utils/constant';
import { RoomType } from '../types';

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

  if (!isStreaming) {
    return (
      <div className="w(100%) h(100%) pack">
        <Loader displayText="방에 입장중입니다..." />
      </div>
    );
  }

  return (
    <div className="w(100%) h(100%)">
      {tracks && (
        <>
          <AgoraVideoCardList agoraUsers={agoraUsers} tracks={tracks} />
          <VideoController tracks={tracks} toggleIsStreaming={toggleIsStreaming} uuid={uuid} ownerId={owner?.id} />
        </>
      )}
    </div>
  );
}
