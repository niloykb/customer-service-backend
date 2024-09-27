import bcrypt from 'bcrypt';
import prisma from '../config/db';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';


export class UserService {
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  async loginUser(email: string, password: string): Promise<{ token: string, user: User }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    return { token: generateToken(user), user: user };
  };

  async users(): Promise<Omit<User, 'password' | 'createdAt' | 'updateAt'>[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      },
    });
  };
}