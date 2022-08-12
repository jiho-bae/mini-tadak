import { auth } from './auth';

const emailTail = process.env.REACT_APP_EMAIL_TAIL;
const pwdTail = process.env.REACT_APP_PWD_TAIL;

export type BodyType = {
  [key: string]: string | number | null;
};

async function getAuthHeader(isAuth: boolean) {
  if (!isAuth) return {};
  return await auth.getHeader();
}

export function userBaseLoginOptions(userId: string, password: string) {
  return {
    email: `${userId}${emailTail}`,
    password: `${password}${pwdTail}`,
  };
}

export function userBaseJoinOptions(userId: string, password: string) {
  return {
    email: `${userId}${emailTail}`,
    password: `${password}${pwdTail}`,
    nickname: userId,
    devField: 1,
  };
}

export async function simpleOptions(method: string, isAuth: boolean) {
  const authHeader = await getAuthHeader(isAuth);

  return {
    method,
    headers: {
      Accept: 'application/json',
      ...authHeader,
    },
    credentials: 'include',
  };
}

export function getOptions(isAuth = false) {
  return simpleOptions('GET', isAuth);
}

export async function postOptions(body: BodyType, isAuth = false) {
  const authHeader = await getAuthHeader(isAuth);

  return Object.keys(body).length
    ? {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...authHeader,
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    : simpleOptions('POST', false);
}

export async function patchOptions(body: BodyType, isAuth = false) {
  const authHeader = await getAuthHeader(isAuth);

  return Object.keys(body).length
    ? {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...authHeader,
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    : simpleOptions('PATCH', false);
}

export function deleteOptions(isAuth = false) {
  return simpleOptions('DELETE', isAuth);
}
