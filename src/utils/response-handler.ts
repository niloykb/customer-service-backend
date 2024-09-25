import { Response } from 'express';

type Status = 'success' | 'error';

interface ResponseData {
  status: Status;
  message: string;
  data?: any;
  error?: string;
}

export const handleResponse = (
  res: Response,
  statusCode: number,
  status: Status,
  message: string,
  data: any = null,
  error: any = null
): void => {
  const response: ResponseData = {
    status: status,
    message: message,
  };

  if (data) {
    response.data = data;
  }

  if (error) {
    response.error = error instanceof Error ? error.message : 'Unknown error';
  }
  
  res.status(statusCode).json(response);
};
