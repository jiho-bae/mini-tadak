import {
  createClient,
  ClientConfig,
  createMicrophoneAndCameraTracks,
  createMicrophoneAudioTrack,
  createScreenVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  AgoraRTCError,
  ScreenVideoTrackInitConfig,
} from 'agora-rtc-react';
import { SCREEN_SHARE_HEIGHT } from '../utils/constant';

type ScreenShareReturnType = {
  ready: boolean;
  tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
  error: AgoraRTCError | null;
};

const clientConfig: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const screenShareConfig: ScreenVideoTrackInitConfig = {
  encoderConfig: `${SCREEN_SHARE_HEIGHT}p_1`,
  optimizationMode: 'detail',
};
const screenShareWithVideo = 'disable';

const getClient = createClient(clientConfig);

const getMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const getMicrophoneTrack = createMicrophoneAudioTrack();

const getScreenVideoTrack = (): ScreenShareReturnType =>
  createScreenVideoTrack(screenShareConfig, screenShareWithVideo)();

export { getClient, getMicrophoneAndCameraTracks, getMicrophoneTrack, getScreenVideoTrack };
