import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticate';

import { registerValidationRules, loginValidationRules } from '../validators/user.validators';
import { UserController } from '../controllers/user.controller';

const userRouters = Router();

const user = new UserController();

userRouters.post('/register', registerValidationRules, user.register);
userRouters.post('/login', loginValidationRules, user.login);

userRouters.get('/', authenticateToken, user.index);

export default userRouters;