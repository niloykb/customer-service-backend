import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};
