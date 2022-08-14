import { useEffect, useState, useRef, useCallback } from 'react';
import {
  IRemoteVideoTrack,
  IRemoteAudioTrack,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';

import { SCREEN_SHARE_HEIGHT, SPEAK } from '../../utils/constant';
import { VIDEO_BOX } from '../../utils/styleConstant';

const videoCardStyle = `pack relative w(${VIDEO_BOX.width}) h(${VIDEO_BOX.width}) r(10) overflow(hidden)`;
const volumeVisualizerStyle = `w(${VIDEO_BOX.width}) h(${VIDEO_BOX.width}) absolute right(0) b(3/solid/#75bfff) r(10)`;

interface VideoCardProps {
  videoTrack: ICameraVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack | undefined;
}

interface DivWithFullscreen extends HTMLDivElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

const VideoCard = ({ videoTrack, audioTrack }: VideoCardProps): JSX.Element => {
  const [isSpeak, setIsSpeak] = useState(false);
  const isInterval = useRef(false);
  const videoRef = useRef<DivWithFullscreen>(null);
  const initInterval = useCallback(
    function () {
      if (!isInterval.current) {
        setInterval(() => {
          if (audioTrack) {
            setIsSpeak(audioTrack?.getVolumeLevel() > SPEAK.volume);
          }
        }, SPEAK.visualTime);
      }
      isInterval.current = true;
    },
    [isInterval, audioTrack],
  );

  function openFullscreen() {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    }
  }

  useEffect(() => {
    if (audioTrack) {
      initInterval();
    }
  }, [audioTrack, initInterval]);

  return (
    <div
      className={videoCardStyle}
      onDoubleClick={() => {
        if (videoTrack?.getCurrentFrameData()?.height === SCREEN_SHARE_HEIGHT) {
          openFullscreen();
        }
      }}
      ref={videoRef}>
      {videoTrack && (
        <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} className="video" videoTrack={videoTrack} />
      )}
      {isSpeak && <div className={volumeVisualizerStyle}></div>}
    </div>
  );
};

export default VideoCard;
