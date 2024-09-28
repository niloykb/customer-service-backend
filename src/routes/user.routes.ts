import { Router } from 'express';
import { UserService } from '../services/user.service';
import { authenticateToken } from '../middleware/authenticate';
import { UserController } from '../controllers/user.controller';
import { registerValidationRules, loginValidationRules } from '../validators/user.validators';

const userRouters = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouters.get('/', authenticateToken, userController.index.bind(userController));
userRouters.post('/login', loginValidationRules, userController.login.bind(userController));
userRouters.post('/register', registerValidationRules, userController.register.bind(userController));

export default userRouters;