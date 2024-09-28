import bcrypt from 'bcrypt';
import prisma from '../config/db';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';

type SafeUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
type UserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export class UserService {
  async createUser(userData: UserData): Promise<SafeUser> {

    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
      const { password, createdAt, updatedAt, ...userObject } = user;
      return userObject;
    } catch (error: any) {
      throw new Error(error?.meta?.cause || error);
    }
  };

  async loginUser(credentials: UserData): Promise<{ token: string, user: SafeUser }> {
    const { email, password } = credentials;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Invalid password');

      const { password: _, createdAt, updatedAt, ...userObject } = user;

      return { token: generateToken(user), user: userObject };
    } catch (error: any) {
      throw new Error(error?.meta?.cause || error);
    }
  }


  async users(): Promise<SafeUser[]> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true
        },
      });

      if (!users.length) throw new Error('Users not found');
      return users;
    } catch (error: any) {
      throw new Error(error?.meta?.cause || error);
    }
  };
}