import { atom } from 'recoil';
import ParticipantType from 'src/types/participant';

export interface ParticipantsProps {
  [key: string]: ParticipantType;
}

export const participantState = atom<ParticipantsProps>({
  key: 'participantState',
  default: {},
});
