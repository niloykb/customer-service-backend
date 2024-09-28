import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleResponse } from '../utils/response-handler';
import { CustomerService } from '../services/customer.service';

export class CustomerController {

    constructor(private customerService: CustomerService) { }

    async store(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return handleResponse(res, 400, 'error', errors.array()[0].msg, null, errors.array());
        }

        try {
            const createdCustomer = await this.customerService.createCustomer(req.body);
            return handleResponse(res, 201, 'success', 'Customer created successfully', createdCustomer);
        } catch (error) {
            return handleResponse(res, 500, 'error', 'Failed to create customer!', null, error);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleResponse(res, 400, 'error', errors.array()[0].msg, null, errors.array());
        }

        try {
            const updatedCustomer = await this.customerService.updateCustomer(id, req.body);
            return handleResponse(res, 200, 'success', 'Customer updated successfully', updatedCustomer);
        } catch (error) {
            return handleResponse(res, 500, 'error', 'Failed to update customer!', null, error);
        }
    }

    async index(req: Request, res: Response): Promise<void> {
        try {
            const customers = await this.customerService.listCustomers();
            return handleResponse(res, 200, 'success', 'Customers retrieved successfully', customers);
        } catch (error) {
            return handleResponse(res, 500, 'error', 'Failed to retrieve customers!', null, error);
        }
    }

    async destroy(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        try {
            const deletedCustomer = await this.customerService.deleteCustomer(Number(id));
            return handleResponse(res, 200, 'success', 'Customer deleted successfully', deletedCustomer);
        } catch (error) {
            return handleResponse(res, 500, 'error', 'Failed to delete customer!', null, error);
        }
    }
    async show(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        try {
            const foundCustomer = await this.customerService.findCustomerById(id);
            return handleResponse(res, 200, 'success', 'Customer fetched successfully', foundCustomer);
        } catch (error) {
            return handleResponse(res, 500, 'error', 'Failed to get customer!', null, error);
        }
    }

}
