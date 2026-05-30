export interface IValidationError {
  msg: string;
  path: string;
  location: string;
  type: string;
  value?: unknown;
}

export interface IApiError {
  name: string;
  code: string;
  message: string;
  details?: IValidationError[];
}

export interface IApiResponse<T = unknown> {
  data: T;
  error: string | null;
  details: IValidationError[] | undefined;
}
