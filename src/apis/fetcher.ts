import { HTTPResponse } from '../types';

export default async function fetcher<T>(url: string, options: RequestInit): Promise<HTTPResponse<T>> {
  try {
    const response = await fetch(url, options);
    const { statusCode, data, message } = await response.json();
    const isOk = response.ok;

    if (isOk) {
      const res = { isOk, data };
      return res;
    }

    throw new Error(message);
  } catch (e: any) {
    return {
      isOk: false,
      errorData: {
        message: e.message,
      },
    };
  }
}
