import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { CHAT_SPAMMER } from './constant';
import { getMiliSecondsDiff } from './utils';

type TracksType = [IMicrophoneAudioTrack, ICameraVideoTrack];

type TimeRefType = React.MutableRefObject<{
  chatTime: number;
  count: number;
}>;

export const isResetTime = (timeRef: TimeRefType) =>
  getMiliSecondsDiff(Date.now(), timeRef.current.chatTime) > CHAT_SPAMMER.ms;

export const isSpammer = (timeRef: TimeRefType) => {
  const { chatTime, count } = timeRef.current;
  const secondsDiff = getMiliSecondsDiff(Date.now(), chatTime);

  return secondsDiff <= CHAT_SPAMMER.ms && count >= CHAT_SPAMMER.count;
};

export const isScrollable = (clientHeight: number, scrollTop: number, scrollHeight: number) => {
  return clientHeight + scrollTop >= scrollHeight;
};

export function isTracks(tracks: TracksType | null): tracks is TracksType {
  return (tracks as TracksType)[0] !== undefined;
}

export const isEmail = (email: string): boolean => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

export const isNickname = (nickname: string): boolean => {
  const regExp = /^(?=[a-zA-Z가-힣])[-a-zA-Z가-힣0-9_.]{2,11}$/;
  return regExp.test(nickname);
};

export const isPassword = (password: string): boolean => {
  const regExp = /^(?=.*\d)(?=[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{6,20}$/;
  return regExp.test(password);
};

export const isEmpty = (str: string) => {
  if (str === '') {
    alert('빈칸을 모두 채워주세요.');
    return true;
  }

  return false;
};
