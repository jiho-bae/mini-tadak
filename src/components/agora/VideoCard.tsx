import { useEffect, useState, useRef, useCallback } from 'react';
import {
  IRemoteVideoTrack,
  IRemoteAudioTrack,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';

import { SCREEN_SHARE_HEIGHT, SPEAK } from '../../utils/constant';
import { FullScreenDivType, openFullScreen } from '../../utils/utils';
import { VIDEO_BOX } from '../../utils/styleConstant';

const videoCardWrapperStyle = 'vbox';
const videoCardStyle = `pack relative w(${VIDEO_BOX.width}) h(${VIDEO_BOX.width}) r(10) overflow(hidden)`;
const volumeVisualizerStyle = `w(${VIDEO_BOX.width}) h(${VIDEO_BOX.width}) absolute right(0) b(3/solid/#75bfff) r(10)`;
const displayNameStyle = 'pack w(100%) font(20) ';

interface VideoCardProps {
  videoTrack: ICameraVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack | undefined;
  displayName: string;
}

const VideoCard = ({ videoTrack, audioTrack, displayName }: VideoCardProps): JSX.Element => {
  const [isSpeak, setIsSpeak] = useState(false);
  const intervalRef = useRef<any>(false);
  const videoRef = useRef<FullScreenDivType>(null);

  const clearVolumeVisualizerInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = false;
  }, []);

  const initVolumneVisualizerInterval = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (audioTrack) {
        setIsSpeak(audioTrack?.getVolumeLevel() > SPEAK.volume);
      }
    }, SPEAK.visualTime);
  }, [intervalRef, audioTrack]);

  function onDoubleClickVideoCard() {
    videoTrack?.getCurrentFrameData()?.height === SCREEN_SHARE_HEIGHT && openFullScreen(videoRef);
  }

  useEffect(() => {
    if (audioTrack) {
      initVolumneVisualizerInterval();
    } else {
      clearVolumeVisualizerInterval();
    }
  }, [audioTrack, initVolumneVisualizerInterval, clearVolumeVisualizerInterval]);

  return (
    <div className={videoCardWrapperStyle}>
      <div className={videoCardStyle} onDoubleClick={onDoubleClickVideoCard} ref={videoRef}>
        {videoTrack && <AgoraVideoPlayer className="w(100%) h(100%)" videoTrack={videoTrack} />}
        {isSpeak && <div className={volumeVisualizerStyle} />}
      </div>
      <div className={displayNameStyle}>{displayName}</div>
    </div>
  );
};

export default VideoCard;
