import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../utils/response-handler';

interface AuthenticatedRequest extends Request {
  user?: string | object;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return handleResponse(res, 401, 'error', 'Authorization token is required');
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    const request = req as AuthenticatedRequest;
    request.user = decoded;
    next();
  } catch (error) {
    return handleResponse(res, 401, 'error', 'Unauthorized');
  }

};

