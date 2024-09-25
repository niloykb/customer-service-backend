import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import * as userController from '../controllers/user-controller';
import { registerValidationRules, loginValidationRules } from '../validators/user-validators';

const router = Router();

router.post('/register', registerValidationRules, userController.register);
router.post('/login', loginValidationRules, userController.login);

router.get('/users', authenticateToken, userController.listUsers);

export default router;