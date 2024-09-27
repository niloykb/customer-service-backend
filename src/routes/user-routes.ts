import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticate';
import { listUsers, login, register } from '../controllers/user-controller';
import { registerValidationRules, loginValidationRules } from '../validators/user-validators';

const router = Router();

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);

router.get('/', authenticateToken, listUsers);

export default router;