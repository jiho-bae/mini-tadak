import { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { MdOutlineExitToApp, MdScreenShare, MdStopScreenShare, MdChat, MdChatBubble } from 'react-icons/md';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useNavigate } from 'react-router-dom';

import CircleButton from '../common/CircleButton';
import ScreenShare from './ScreenShare';

import useToggle from 'src/hooks/useToggle';
import { getClient } from 'src/agora/config';
import { toggleTrack } from 'src/agora/util';

const buttonContainerStyle = `w(100%) h(10%) absolute bottom(1.5rem)`;
const videoControlsStyle = 'pack';
const chatButtonStyle = 'pack';

interface VideoControllerProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  isSideBar: boolean;
  toggleIsSideBar: () => void;
  uuid: string;
  ownerId: number | undefined;
}

const VideoController = ({ tracks, isSideBar, toggleIsSideBar, uuid, ownerId }: VideoControllerProps): JSX.Element => {
  const navigate = useNavigate();
  const client = getClient();
  const [trackState, setTrackState] = useState({ video: false, audio: false });
  const [isScreenShare, toggleIsScreenShare] = useToggle(false);
  const [myAudioTrack, myVideoTrack] = tracks;

  const getOutButtonStyle = `fixed top(10) right(${isSideBar ? '26rem' : '1rem'})`;

  const toggleTrackState = (type: 'audio' | 'video') => {
    return () => {
      setTrackState((ps) => {
        const newState = type === 'audio' ? !ps.audio : !ps.video;
        return { ...ps, [type]: newState };
      });
    };
  };

  return (
    <div className={buttonContainerStyle}>
      <div className={videoControlsStyle}>
        <CircleButton
          icon={trackState.audio ? <FaMicrophone fill="white" /> : <FaMicrophoneSlash />}
          onClick={() => toggleTrack(myAudioTrack, trackState.audio, toggleTrackState('audio'))}
        />
        <CircleButton
          icon={trackState.video ? <FaVideo fill="white" /> : <FaVideoSlash />}
          onClick={() => toggleTrack(myVideoTrack, trackState.video, toggleTrackState('video'))}
        />
        <CircleButton
          icon={isScreenShare ? <MdScreenShare fill="white" /> : <MdStopScreenShare />}
          onClick={toggleIsScreenShare}
        />
        <div className={chatButtonStyle}>
          <CircleButton icon={isSideBar ? <MdChatBubble /> : <MdChat fill="white" />} onClick={toggleIsSideBar} />
        </div>
        {isScreenShare && (
          <ScreenShare
            client={client}
            videoTrack={myVideoTrack}
            trackState={trackState}
            shutDownScreenShare={toggleIsScreenShare}
          />
        )}
      </div>
      <div className={getOutButtonStyle}>
        <CircleButton
          icon={<MdOutlineExitToApp fill="white" />}
          onClick={() => {
            navigate('/main', { replace: true });
          }}
        />
      </div>
    </div>
  );
};

export default VideoController;
