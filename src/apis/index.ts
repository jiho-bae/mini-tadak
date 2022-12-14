import { UserType, RoomType, HTTPResponse } from '../types';
import { queryObjToString, getUrl } from './apiUtils';
import { fetchGet, fetchPost, fetchPatch, fetchDelete, fetchDeleteImage } from './fetchFns';
import fetcher from './fetcher';

interface PostLogin {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  userInfo: UserType;
  token: {
    accessToken: string;
    now: number;
    expiredAt: number;
  };
}

export const postLogin = async (body: PostLogin): Promise<HTTPResponse<PostLoginResponse>> => {
  const response = await fetchPost<PostLoginResponse>('/api/auth/login', { ...body });
  return response;
};

export const postLogout = async (): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>('/api/auth/logout', undefined, true);
  return response;
};

interface PostJoin extends PostLogin {
  nickname: string;
}

export const postJoin = async (body: PostJoin): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>('/api/auth/join', { ...body });
  return response;
};

export const getVisitCount = async (): Promise<HTTPResponse<number>> => {
  const response = await fetchGet<number>('/api/history');
  return response;
};

interface PatchUpdate {
  originalName: string;
  nickname: string;
  devField?: number;
}

export const patchUpdate = async (body: PatchUpdate): Promise<HTTPResponse<UserType>> => {
  const response = await fetchPatch<UserType>(`/api/user`, { ...body });
  return response;
};

export const postAvatar = async (formData: FormData): Promise<HTTPResponse<UserType>> => {
  const url = getUrl('/api/user/image');
  const response = await fetcher<UserType>(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return response;
};

export const deleteImage = async (): Promise<HTTPResponse<UserType>> => {
  const response = await fetchDeleteImage<UserType>('/api/user/image');
  return response;
};

export const getUserByToken = async (): Promise<HTTPResponse<PostLoginResponse>> => {
  const response = await fetchGet<PostLoginResponse>('/api/auth/token');
  return response;
};

interface PostRoom {
  userId?: number;
  title: string;
  description: string | null;
  maxHeadcount: number;
  roomType: string;
}

export const postRoom = async (body: PostRoom): Promise<HTTPResponse<RoomType>> => {
  const response = await fetchPost<RoomType>('/api/room', { ...body }, true);
  return response;
};

interface GetRoomQueryObj {
  type: string;
  search?: string;
  take: number;
  page: number;
}

export interface ResponseGetRoomData {
  pageTotal: number;
  results: RoomType[];
  total: number;
}

export const getRoom = async (queryObj: GetRoomQueryObj): Promise<HTTPResponse<ResponseGetRoomData>> => {
  const queryString = queryObjToString(queryObj);
  const response = await fetchGet<ResponseGetRoomData>('/api/room', queryString);
  return response;
};

export const getRoomByUuid = async (uuid: string): Promise<HTTPResponse<RoomType>> => {
  const response = await fetchGet<RoomType>(`/api/room/${uuid}`);
  return response;
};

interface DeleteRoom {
  uuid: string;
}

export const deleteRoom = ({ uuid }: DeleteRoom): Promise<HTTPResponse<boolean>> =>
  fetchDelete(`/api/room/${uuid}`, true);

export const postEnterRoom = async (uuid: string): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>(`/api/room/${uuid}/join`);
  return response;
};

export const postLeaveRoom = async (uuid: string): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>(`/api/room/${uuid}/leave`);
  return response;
};

interface GetDevField {
  id: string;
  name: string;
}

export const getDevField = async (): Promise<HTTPResponse<GetDevField[]>> => {
  const response = await fetchGet<GetDevField[]>(`/api/field`);
  return response;
};

interface UserLogList {
  id: number;
  checkIn: string;
}

export const getUserLogList = async (): Promise<HTTPResponse<UserLogList[]>> => {
  const response = await fetchGet<UserLogList[]>('/api/user/log/year');
  return response;
};

interface UserLogListPerMonth {
  [key: string]: number;
}

export const getUserLogListPerMonth = async (): Promise<HTTPResponse<UserLogListPerMonth>> => {
  const response = await fetchGet<UserLogListPerMonth>('/api/user/log/month');
  return response;
};
