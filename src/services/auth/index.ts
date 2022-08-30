import { LocalStorage } from '../../utils/localStorage';
import { getUserByToken } from '../../apis/index';
import { getMiliSecondsDiff } from 'src/utils/utils';
import { TOKEN_EXPIRED_TIME } from 'src/utils/constant';

export type SetTokenParams = {
  accessToken: string;
  now: number;
  expiredAt: number;
};

export const auth = (function (setAuthFlag, clearAuthFlag) {
  let _token: string | null | undefined = null;
  let _serverTime = null;
  let _expiredTime: number | null = null;

  function validateToken() {
    if (!_token) return false;
    if (!_expiredTime) return false;

    const restTime = getMiliSecondsDiff(_expiredTime, Date.now());
    return restTime >= TOKEN_EXPIRED_TIME.ms;
  }

  function hasAccessToken(isClearLocalStorage = false) {
    if (!validateToken()) {
      clearAccessToken(isClearLocalStorage);
    }
    return _token ?? false;
  }

  function setAccessToken({ accessToken, now, expiredAt }: SetTokenParams) {
    setAuthFlag();

    _token = accessToken;
    _serverTime = now;
    _expiredTime = expiredAt;
  }

  function clearAccessToken(isClearLocalStorage = false) {
    if (isClearLocalStorage) {
      clearAuthFlag();
    }

    _token = null;
    _serverTime = null;
    _expiredTime = null;
  }

  async function getHeader() {
    const isValid = validateToken();
    if (!isValid) {
      await requestAccessToken();
    }
    return { Authorization: `Bearer ${_token}` };
  }

  async function requestAccessToken() {
    const { isOk, data } = await getUserByToken();
    if (isOk && data) {
      setAccessToken(data.token);
      return;
    }
  }

  return { hasAccessToken, setAccessToken, clearAccessToken, getHeader, requestAccessToken };
})(LocalStorage.setAuthFlag, LocalStorage.removeAuthFlag);
