import {
  createClient,
  ClientConfig,
  createMicrophoneAndCameraTracks,
  createMicrophoneAudioTrack,
  createScreenVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  AgoraRTCError,
} from 'agora-rtc-react';
import { SCREEN_SHARE_HEIGHT } from '../utils/constant';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const getClient = createClient(config);
const getMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const getMicrophoneTrack = createMicrophoneAudioTrack();
const getScreenVideoTrack = (): {
  ready: boolean;
  tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
  error: AgoraRTCError | null;
} => {
  const screenShare = createScreenVideoTrack(
    {
      encoderConfig: `${SCREEN_SHARE_HEIGHT}p_1`,
      optimizationMode: 'detail',
    },
    'disable',
  );
  return screenShare();
};

export { getClient, getMicrophoneAndCameraTracks, getMicrophoneTrack, getScreenVideoTrack };
