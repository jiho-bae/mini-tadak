import UserType from './user';

export default interface RoomType {
  id: number;
  agoraAppId: string;
  agoraToken: string;
  createdAt: string;
  description: string;
  nowHeadcount: number;
  maxHeadcount: number;
  owner: UserType;
  title: string;
  roomType: string;
  updatedAt: string;
  uuid: string;
}
