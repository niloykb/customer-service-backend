import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticate';
import { CustomerService } from '../services/customer.service';
import { CustomerController } from '../controllers/customer.controller';
import { storeCustomerValidationRules, updateCustomerValidationRules, partialUpdateCustomerValidationRules } from '../validators/customer.validators';

const customerRouters = Router();
const customerService = new CustomerService()
const customerController = new CustomerController(customerService);

customerRouters.get('/', authenticateToken, customerController.index.bind(customerController));
customerRouters.get('/:id', authenticateToken, customerController.show.bind(customerController));
customerRouters.delete('/:id', authenticateToken, customerController.destroy.bind(customerController));
customerRouters.post('/', authenticateToken, storeCustomerValidationRules, customerController.store.bind(customerController));
customerRouters.put('/:id', authenticateToken, updateCustomerValidationRules, customerController.update.bind(customerController));
customerRouters.patch('/:id', authenticateToken, partialUpdateCustomerValidationRules, customerController.update.bind(customerController));

export default customerRouters;