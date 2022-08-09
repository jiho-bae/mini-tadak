import { DevFieldType } from './devField';

export default interface UserType {
  id?: number;
  nickname?: string;
  email?: string;
  imageUrl?: string;
  introduction?: string;
  isSocial?: boolean;
  devField?: {
    id: number;
    name: DevFieldType;
  };
  login?: boolean;
}
