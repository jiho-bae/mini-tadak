type AfterFetcherArgs<T> = {
  fetchFn: Function;
  fetchFnArgs?: Array<T>;
  onSuccess: Function;
  onError: Function;
};

export default async function afterFetcher({ fetchFn, fetchFnArgs, onSuccess, onError }: AfterFetcherArgs<any>) {
  const args = fetchFnArgs ?? [];
  const { isOk, errorData, data } = await fetchFn(...args);

  if (isOk) {
    onSuccess(data);
    return;
  }

  onError(errorData);
}
