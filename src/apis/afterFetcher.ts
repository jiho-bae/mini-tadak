import { HTTPResponse } from 'src/types';

type AfterFetcherArgs<T> = {
  fetchResult: HTTPResponse<T>;
  onSuccess: Function;
  onError: Function;
};

export default async function afterFetcher({ fetchResult, onSuccess, onError }: AfterFetcherArgs<any>) {
  const { isOk, errorData, data } = fetchResult;

  if (isOk) {
    onSuccess(data);
    return;
  }

  onError(errorData);
}
