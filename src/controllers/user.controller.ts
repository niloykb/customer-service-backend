import prisma from '../config/db';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserService } from '../services/user.service';
import { getErrorMessage, handleResponse } from '../utils/response-handler';

const userService = new UserService()

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });
    if (existingUser) {
      return handleResponse(res, 500, 'error', 'User already exists');
    }
    if (!errors.isEmpty()) {
      return handleResponse(res, 400, 'error', 'Validation failed', null, errors.array());
    }
    try {
      const user = await userService.createUser(req.body);
      return handleResponse(res, 201, 'success', 'User created successfully', user);
    } catch (error) {
      return handleResponse(res, 500, 'error', getErrorMessage(error));
    }
  };

  async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse(res, 400, 'error', 'Validation failed', null, errors.array());
    }
    try {
      const { email, password } = req.body;
      const { token, user } = await userService.loginUser(email, password);
      const { id, name, email: userEmail } = user;

      handleResponse(res, 200, 'success', 'Login successful', { id, name, email: userEmail }, null, token);

    } catch (error) {
      return handleResponse(res, 500, 'error', getErrorMessage(error));
    }

  };

  async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.users();
      handleResponse(res, 200, 'success', 'Users retrieved successfully', users);
    } catch (error) {
      return handleResponse(res, 500, 'error', getErrorMessage(error));
    }
  };

}
