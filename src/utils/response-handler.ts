import { Response } from 'express';

type Status = 'success' | 'error';

interface ResponseData {
  status: Status;
  message: string;
  data?: any;
  error?: string | string[];
  token?: string;
}

export const handleResponse = (
  res: Response,
  statusCode: number,
  status: Status,
  message: string,
  data: any = null,
  error: any = null,
  token?: string,
): void => {
  const response: ResponseData = {
    status,
    message,
    ...(data && { data }),
    ...(token && { token }),
    ...(error && { error: Array.isArray(error) ? error : error instanceof Error ? error.message : 'Unknown error' }),
  };

  res.status(statusCode).json(response);
};
