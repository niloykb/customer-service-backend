import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticate';
import * as userController from '../controllers/user-controller';
import { registerValidationRules, loginValidationRules } from '../validators/user-validators';

const router = Router();

router.post('/register', registerValidationRules, userController.register);
router.post('/login', loginValidationRules, userController.login);

router.get('/users', userController.listUsers);

export default router;