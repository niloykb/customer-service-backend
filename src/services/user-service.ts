import bcrypt from 'bcrypt';
import prisma from '../config/db';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';

export const createUser = async (userData: Omit<User, 'id'>): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (email: string, password: string): Promise<{ token: string, user: User }> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');

  return { token: generateToken(user), user: user };
};

export const getAllUsers = async () => {
  return await prisma.user.findMany(
    {
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    }
  );
};