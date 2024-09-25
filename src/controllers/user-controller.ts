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
    const token = await userService.loginUser(email, password);
    handleResponse(res, 200, 'success', 'Login successful', { token });
  } catch (error) {
    return handleResponse(res, 401, 'error', 'Invalid Credentials', null, error);
  }

};