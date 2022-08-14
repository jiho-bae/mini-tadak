import { LocalStorage } from '../utils/localStorage';
import { getUserByToken } from './index';

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

    const current = Date.now();
    const restTime = Math.floor((_expiredTime - current) / 1000);

    return restTime >= 180;
  }

  return {
    hasAccessToken(isClearLocalStorage = false) {
      if (!validateToken()) {
        this.clearAccessToken(isClearLocalStorage);
      }
      return _token ?? false;
    },
    setAccessToken({ accessToken, now, expiredAt }: SetTokenParams) {
      setAuthFlag();

      _token = accessToken;
      _serverTime = now;
      _expiredTime = expiredAt;
    },
    clearAccessToken(isClearLocalStorage = false) {
      if (isClearLocalStorage) {
        clearAuthFlag();
      }

      _token = null;
      _serverTime = null;
      _expiredTime = null;
    },
    async getHeader() {
      const isValid = validateToken();
      if (!isValid) {
        await this.requestAccessToken();
      }
      return { Authorization: `Bearer ${_token}` };
    },
    async requestAccessToken() {
      const { isOk, data } = await getUserByToken();
      if (isOk && data) {
        this.setAccessToken(data.token);
        return;
      }
    },
  };
})(LocalStorage.setAuthFlag, LocalStorage.removeAuthFlag);
