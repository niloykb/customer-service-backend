import prisma from '../config/db';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getErrorMessage, handleResponse } from '../utils/response-handler';
import { CustomerService } from '../services/customer.service';

const customerService = new CustomerService();

export class CustomerController {
    async store(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (req.body.email) {
            const existingUser = await prisma.customer.findUnique({
                where: {
                    email: req.body.email
                }
            });

            if (existingUser) {
                return handleResponse(res, 500, 'error', 'Customer already exists');
            }
        }

        if (!errors.isEmpty()) {
            return handleResponse(res, 400, 'error', 'Validation failed', null, errors.array());
        }

        const customerData = req.body;
        try {
            const customer = await customerService.createCustomer(customerData);
            const { createdAt, updatedAt, ...customerObject } = customer;
            return handleResponse(res, 201, 'success', 'Customer created successfully', customerObject);

        } catch (error) {
            return handleResponse(res, 500, 'error', getErrorMessage(error));
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return handleResponse(res, 400, 'error', 'Validation failed', null, errors.array());
        }

        const { id } = req.params;
        const customerData = req.body;

        try {
            const customer = await customerService.updateCustomer(Number(id), customerData);

            if (customer) {
                const { createdAt, updatedAt, ...customerObject } = customer;
                return handleResponse(res, 200, 'success', 'Customer updated successfully', customerObject);

            } else {
                return handleResponse(res, 404, 'error', 'Customer not found');
            }
        } catch (error) {
            return handleResponse(res, 500, 'error', getErrorMessage(error));
        }
    }

    async index(req: Request, res: Response): Promise<void> {
        try {
            const customers = await customerService.listCustomers();
            return handleResponse(res, 200, 'success', 'Customers retrieved successfully', customers);
        } catch (error) {
            return handleResponse(res, 500, 'error', getErrorMessage(error));
        }
    }

    async destroy(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const customer = await customerService.deleteCustomer(Number(id));
            const { createdAt, updatedAt, ...customerObject } = customer ?? {};
            return handleResponse(res, 200, 'success', 'Customer deleted successfully', customerObject);

        } catch (error) {
            return handleResponse(res, 500, 'error', getErrorMessage(error));
        }
    }
    async show(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const customer = await customerService.findCustomerById(Number(id));
            if (customer) {
                return handleResponse(res, 200, 'success', 'Customer fetched successfully', customer);
            } else {
                return handleResponse(res, 404, 'error', 'Customer not found');

            }
        } catch (error) {
            return handleResponse(res, 500, 'error', getErrorMessage(error));
        }
    }

}
