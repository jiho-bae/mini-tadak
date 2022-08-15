import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import { userState } from '../../hooks/recoil/atom';
import { useRecoilValue } from 'recoil';

import AgoraVideoCard from './VideoCard';
const videoContainerStyle = 'pack h(90%)';

interface VideoCardListProps {
  agoraUsers: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const VideoCardList = ({ agoraUsers, tracks }: VideoCardListProps): JSX.Element => {
  const [myAudioTrack, myVideoTrack] = tracks;
  const userInfo = useRecoilValue(userState);
  const displayName = `${userInfo.nickname}(나)`;
  const videoGridStyle = `p(20) grid grid-cols(${Math.min(agoraUsers.length + 1, 3)}) gap(10)`;

  return (
    <div className={videoContainerStyle}>
      <div id="videos" className={videoGridStyle}>
        <AgoraVideoCard
          key={userInfo.nickname}
          videoTrack={myVideoTrack}
          audioTrack={myAudioTrack}
          displayName={displayName}
        />
        {agoraUsers.map(({ uid, videoTrack, audioTrack }) => (
          <AgoraVideoCard
            key={uid}
            videoTrack={videoTrack}
            audioTrack={audioTrack}
            displayName={decodeURI(String(uid))}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCardList;
