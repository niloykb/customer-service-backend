import { Router } from 'express';
import userRouters from './user.routes';
import customerRouters from './customer.routes';

const router = Router();

router.use('/users', userRouters);
router.use('/customers', customerRouters);

export default router;