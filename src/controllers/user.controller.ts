import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserService } from '../services/user.service';
import { handleResponse } from '../utils/response-handler';

export class UserController {
  constructor(private userService: UserService) { }
  async register(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return handleResponse(res, 400, 'error', 'Validation failed', null, errors.array());
    }

    try {
      const user = await this.userService.createUser(req.body);
      return handleResponse(res, 201, 'success', 'User created successfully', user);
    } catch (error) {
      return handleResponse(res, 500, 'error', 'Registration failed!', null, error);
    }
  };

  async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return handleResponse(res, 400, 'error', 'Validation failed', null, errors.array());
    }

    try {
      const { token, user } = await this.userService.loginUser(req.body);
      handleResponse(res, 200, 'success', 'Login successful', user, null, token);
    } catch (error) {
      return handleResponse(res, 500, 'error', 'Failed to log in!', null, error);
    }

  };

  async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.users();
      handleResponse(res, 200, 'success', 'Users retrieved successfully', users);
    } catch (error) {
      return handleResponse(res, 500, 'error', 'Failed to retrieved users!', null, error);
    }
  };

}
