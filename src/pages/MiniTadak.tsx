import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getMicrophoneAndCameraTracks } from '../agora/config';
import { userState } from '../hooks/recoil/atom';
import useAgora from '../hooks/useAgora';
import { RoomType } from '../types';
import { PAGE_NAME } from '../utils/constant';

type LocationStateType = {
  state: RoomType;
};

export default function MiniTadak() {
  const {
    state: { agoraAppId, agoraToken, uuid },
  } = useLocation() as LocationStateType;
  const userInfo = useRecoilValue(userState);
  const { ready, tracks } = getMicrophoneAndCameraTracks();
  const agoraOptions = { userInfo, ready, tracks, agoraAppId, agoraToken, uuid, agoraType: PAGE_NAME.tadak };
  const { agoraUsers, isStreaming, toggleIsStreaming } = useAgora(agoraOptions);

  if (!isStreaming) {
    return <div>loading....</div>;
  }

  return <div>ready to streaming!!</div>;
}
