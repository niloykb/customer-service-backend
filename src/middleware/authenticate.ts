import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import { User } from '../models/user.model';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' })
  }
  try {
    const parsedText = token.split(" ")[1];
    const decoded = verify(parsedText, process.env.JWT_SECRET as string);
    const request = req as AuthRequest;
    request.userId = decoded.sub as string;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })

  }
  // jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user as User;
  //   next();
  // });
};