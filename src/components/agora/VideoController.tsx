import { useState, useCallback, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { MdOutlineExitToApp, MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useNavigate } from 'react-router-dom';

import useToggle from 'src/hooks/useToggle';
import { getClient } from 'src/agora/config';
import CircleButton from '../common/CircleButton';
import ScreenShare from './ScreenShare';

const buttonContainerStyle = 'w(100%) h(10%) relative';
const videoControlsStyle = 'pack';
const getOutButtonStyle = 'fixed top(0) top(10) right(10)';

interface VideoControllerProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  toggleIsStreaming: () => void;
  uuid: string;
  ownerId: number | undefined;
}

const VideoController = ({ tracks, toggleIsStreaming, uuid, ownerId }: VideoControllerProps): JSX.Element => {
  const navigate = useNavigate();
  const client = getClient();
  const [trackState, setTrackState] = useState({ video: false, audio: false });
  const [isScreenShare, toggleIsScreenShare] = useToggle(false);
  const [myAudioTrack, myVideoTrack] = tracks;

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await myAudioTrack.setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      await myVideoTrack.setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
      if (trackState.video) await client.publish(myVideoTrack);
    }
  };

  const leaveAgoraChannel = useCallback(async () => {
    await client.leave();
    client.removeAllListeners();
    myAudioTrack.close();
    myVideoTrack.close();

    toggleIsStreaming();
  }, [client, myAudioTrack, myVideoTrack, toggleIsStreaming]);

  //   useEffect(() => {
  //     return history.listen(() => {
  //       if (history.action === 'POP') {
  //         leaveChannel();
  //       }
  //     });
  //   }, [history, leaveChannel]);

  return (
    <div className={buttonContainerStyle}>
      <div className={videoControlsStyle}>
        <CircleButton
          icon={trackState.audio ? <FaMicrophone fill="white" /> : <FaMicrophoneSlash />}
          onClick={() => mute('audio')}
        />
        <CircleButton
          icon={trackState.video ? <FaVideo fill="white" /> : <FaVideoSlash />}
          onClick={() => mute('video')}
        />
        <CircleButton
          icon={isScreenShare ? <MdScreenShare fill="white" /> : <MdStopScreenShare />}
          onClick={toggleIsScreenShare}
        />
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
            leaveAgoraChannel();
            navigate('/main', { replace: true });
          }}
        />
      </div>
    </div>
  );
};

export default VideoController;
