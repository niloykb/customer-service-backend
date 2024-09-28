import { Response } from 'express';

type Status = 'success' | 'error';

interface ResponseData {
  status: Status;
  message: string;
  data?: any;
  error?: string;
  errors?: string[];
  token?: string;
}

export const handleResponse = (
  res: Response,
  statusCode: number,
  status: Status,
  message: string,
  data?: any,
  error?: any,
  token?: string
): void => {
  const response: Partial<ResponseData> = {
    status,
    message,
    data: data || undefined,
    token: token || undefined,
    ...(Array.isArray(error) ? { errors: error } : error && { error: error instanceof Error ? error.message : String(error) }),
  };

  res.status(statusCode).json(response);
};
