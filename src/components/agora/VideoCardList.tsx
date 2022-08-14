import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import { userState } from '../../hooks/recoil/atom';
import { useRecoilValue } from 'recoil';

import AgoraVideoCard from './VideoCard';

const videoContainerStyle = 'pack h(100%)';
const videoCardWrapperStyle = 'vbox';
const userInfoDivStyle = 'pack w(100%) font(20) ';
const myInfoDivStyle = 'bold';
const videoGridStyle = 'p(20) grid grid-cols(3) gap(10)';

interface VideoCardListProps {
  agoraUsers: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const VideoCardList = ({ agoraUsers, tracks }: VideoCardListProps): JSX.Element => {
  const [myAudioTrack, myVideoTrack] = tracks;
  const userInfo = useRecoilValue(userState);

  return (
    <div className={videoContainerStyle}>
      <div id="videos" className={videoGridStyle}>
        <div key={userInfo.nickname} className={videoCardWrapperStyle}>
          <AgoraVideoCard videoTrack={myVideoTrack} audioTrack={myAudioTrack} />
          <div className={userInfoDivStyle + myInfoDivStyle}>{userInfo.nickname}(나)</div>
        </div>
        {agoraUsers.length > 0 &&
          agoraUsers.map(({ uid, videoTrack, audioTrack }) => (
            <div key={uid} className={videoCardWrapperStyle}>
              <AgoraVideoCard videoTrack={videoTrack} audioTrack={audioTrack} />
              <div className={userInfoDivStyle}>{decodeURI(String(uid))}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoCardList;
