export type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

export interface ServiceResponseError {
  status: ServiceResponseErrorType;
  data: {
    message: string;
  };
}

export interface ServiceResponseSuccess<T> {
  status: 'SUCCESSFUL';
  data: T;
}

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
