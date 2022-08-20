export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

export interface HTTPResponse<T> {
  isOk: boolean;
  errorData?: ErrorResponse;
  data?: T;
}
