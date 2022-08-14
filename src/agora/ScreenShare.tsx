import { useCallback, useEffect, useRef } from 'react';
import { IAgoraRTCClient, ICameraVideoTrack } from 'agora-rtc-react';
import { getScreenVideoTrack } from './config';

interface ScreenShareProps {
  client: IAgoraRTCClient;
  videoTrack: ICameraVideoTrack;
  trackState: { video: boolean; audio: boolean };
  shutDownScreenShare: () => void;
}

const ScreenShare = ({ client, videoTrack, trackState, shutDownScreenShare }: ScreenShareProps): JSX.Element => {
  const { ready, tracks, error } = getScreenVideoTrack();
  const firstRenderRef = useRef(true);

  const publishScreenShare = useCallback(async () => {
    await client.unpublish(videoTrack);
    await client.publish(tracks);

    if (!Array.isArray(tracks)) {
      tracks.on('track-ended', async () => {
        await client.unpublish(tracks);
        tracks.close();
        if (trackState.video) {
          await client.publish(videoTrack);
        }
        shutDownScreenShare();
      });
    }
  }, [client, videoTrack, tracks, trackState, shutDownScreenShare]);

  useEffect(() => {
    if (ready && tracks) publishScreenShare();
    if (error) shutDownScreenShare();

    return () => {
      if (firstRenderRef.current) {
        firstRenderRef.current = false;
        return;
      }

      if (!error && !Array.isArray(tracks)) {
        client.unpublish(tracks);
        tracks.close();
      }
    };
  }, [client, ready, tracks, error, videoTrack, publishScreenShare, shutDownScreenShare]);

  return <div></div>;
};

export default ScreenShare;
