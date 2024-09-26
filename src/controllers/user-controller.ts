import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as userService from '../services/user-service';
import { handleResponse } from '../utils/response-handler';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleResponse(res, 400, 'error', 'Validation failed', null, errors.array());
  }
  try {
    const user = await userService.createUser(req.body);
    return handleResponse(res, 201, 'success', 'User created successfully', user, null);
  } catch (error) {
    return handleResponse(res, 500, 'error', 'Unable to create user', null, error);
  }
};

export const login = async (req: Request, res: Response) => {
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
    return handleResponse(res, 401, 'error', 'Invalid Credentials', null, error);
  }

};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    handleResponse(res, 200, 'success', 'Users retrieved successfully', users);
  } catch (error) {
    handleResponse(res, 500, 'error', 'Unable to retrieve users', null, error);
  }
};