import { getUserByToken } from './index';

export type SetTokenParams = {
  accessToken: string;
  now: number;
  expiredAt: number;
};

export const auth = (function () {
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
    hasAccessToken() {
      if (!validateToken()) {
        this.clearAccessToken();
      }
      return _token ?? false;
    },
    setAccessToken({ accessToken, now, expiredAt }: SetTokenParams) {
      _token = accessToken;
      _serverTime = now;
      _expiredTime = expiredAt;
    },
    clearAccessToken() {
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
})();