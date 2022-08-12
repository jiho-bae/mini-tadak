import { HTTPResponse } from '../types';
import { getOptions, postOptions, patchOptions, deleteOptions, BodyType } from './options';
import fetcher from './fetcher';
import { getUrl } from './apiUtils';

export async function fetchGet<T>(url: string, query = '', isAuth = false): Promise<HTTPResponse<T>> {
  const path = query ? `${url}?${query}` : url;
  const requestUrl = getUrl(path);
  const options = (await getOptions(isAuth)) as RequestInit;
  const response = await fetcher<T>(requestUrl, options);
  return response;
}

export async function fetchPost<T>(url: string, body: BodyType = {}, isAuth = false): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(url);
  const options = (await postOptions(body, isAuth)) as RequestInit;
  const response = await fetcher<T>(requestUrl, options);
  return response;
}

export async function fetchPatch<T>(url: string, body: BodyType = {}, isAuth = false): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(url);
  const options = (await patchOptions(body, isAuth)) as RequestInit;
  const response = await fetcher<T>(requestUrl, options);
  return response;
}

export async function fetchDelete<T>(url: string, isAuth = false): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(url);
  const options = (await deleteOptions(isAuth)) as RequestInit;
  const response = await fetcher<T>(requestUrl, options);
  return response;
}

export async function fetchDeleteImage<T>(url: string, isAuth = false): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(url);
  const options = (await deleteOptions(isAuth)) as RequestInit;
  const response = await fetcher<T>(requestUrl, options);
  return response;
}
