import { Response } from 'express';

type Status = 'success' | 'error';

interface ResponseData {
  status: Status;
  message: string;
  data?: any;
  errors?: string[];
  token?: string;
}

export const handleResponse = (
  res: Response,
  statusCode: number,
  status: Status,
  message: string,
  data?: any,
  errors?: any,
  token?: string
): void => {
  const response: Partial<ResponseData> = {
    status,
    message,
    ...(data && { data }),
    ...(token && { token }),
    ...(errors && { errors }),
  };

  res.status(statusCode).json(response);
};

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error';
}
