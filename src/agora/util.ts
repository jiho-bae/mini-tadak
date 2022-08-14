import { IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

export const userPublished = (
  agoraType: string,
  client: IAgoraRTCClient,
  setState: (user: IAgoraRTCRemoteUser) => void,
) => {
  if (agoraType === 'tadak') {
    return async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      console.log('subscribe success');
      if (mediaType === 'video') {
        setState(user);
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play();
      }
    };
  }

  return async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
    await client.subscribe(user, mediaType);
    console.log('subscribe success');
    if (mediaType === 'audio') {
      setState(user);
      user.audioTrack?.play();
    }
  };
};

export const userUnpublished = (agoraType: string) => {
  if (agoraType === 'tadak') {
    return (user: IAgoraRTCRemoteUser, type: 'audio' | 'video') => {
      console.log('unpublished', user, type);
      if (type === 'audio') {
        user.audioTrack?.stop();
      }
      if (type === 'video') {
        user.videoTrack?.stop();
      }
    };
  }

  return (user: IAgoraRTCRemoteUser, type: 'audio' | 'video') => {
    console.log('unpublished', user, type);
    if (type === 'audio') {
      user.audioTrack?.stop();
    }
  };
};

export const userChanged = (setState: (user: IAgoraRTCRemoteUser) => void) => {
  return (user: IAgoraRTCRemoteUser) => {
    setState(user);
  };
};

type ListenTrackType = {
  track?: IMicrophoneAudioTrack | null;
  tracks?: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
};

export const publishTrack = async (
  client: IAgoraRTCClient,
  track: [IMicrophoneAudioTrack, ICameraVideoTrack] | IMicrophoneAudioTrack | null | undefined,
) => track && (await client.publish(track));

export const muteTrack = async ({ tracks, track }: ListenTrackType) => {
  if (tracks) {
    await tracks[1].setEnabled(false);
    await tracks[0].setEnabled(false);
  }

  if (track) {
    await track.setEnabled(false);
  }
};
