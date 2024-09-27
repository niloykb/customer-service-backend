import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticate';
import { CustomerController } from '../controllers/customer.controller';
import { storeCustomerValidationRules, updateCustomerValidationRules, partialUpdateCustomerValidationRules } from '../validators/customer.validators';

const customerRouters = Router();
const customer = new CustomerController();

customerRouters.get('/', authenticateToken, customer.index);
customerRouters.post('/', storeCustomerValidationRules, authenticateToken, customer.store);
customerRouters.get('/:id', authenticateToken, customer.show);
customerRouters.put('/:id', updateCustomerValidationRules, authenticateToken, customer.update);
customerRouters.patch('/:id', partialUpdateCustomerValidationRules, authenticateToken, customer.update);
customerRouters.delete('/:id', authenticateToken, customer.destroy);

export default customerRouters;