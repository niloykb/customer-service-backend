import prisma from '../config/db';
import { Customer } from '../models/customer.model';

type ReturnData = Omit<Customer, 'createdAt' | 'updatedAt'> | null;
type CustomerData = Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'invoices'>;
export class CustomerService {
    async createCustomer(data: CustomerData): Promise<ReturnData> {
        try {
            const createdCustomer = await prisma.customer.create({
                data
            });
            const { createdAt, updatedAt, ...customerObject } = createdCustomer;

            return customerObject;
        } catch (error: any) {
            throw new Error(error?.meta?.cause || error);
        }

    }

    async updateCustomer(id: number, data: CustomerData): Promise<ReturnData> {
        try {
            const customer = await prisma.customer.update({
                where: { id },
                data,
            });

            const { createdAt, updatedAt, ...customerObject } = customer;
            return customerObject;
        } catch (error: any) {
            throw new Error(error?.meta?.cause || error);
        }
    }

    async listCustomers(): Promise<Omit<Customer, 'createdAt' | 'updatedAt'>[]> {
        try {
            const customers = await prisma.customer.findMany({
                select: {
                    id: true,
                    name: true,
                    type: true,
                    email: true,
                    address: true,
                    city: true,
                    state: true,
                    postalCode: true,
                },
            });

            if (!customers.length) throw new Error('Customers not found');

            return customers;
        } catch (error: any) {
            throw new Error(error?.meta?.cause || error);
        }
    }

    async deleteCustomer(id: number): Promise<Omit<Customer, 'createdAt' | 'updatedAt'>> {
        try {
            const deletedCustomer = await prisma.customer.delete({
                where: { id },
            });

            const { createdAt, updatedAt, ...customerObject } = deletedCustomer;
            return customerObject;
        } catch (error: any) {
            throw new Error(error?.meta?.cause || error);
        }
    }

    async findCustomerById(id: number): Promise<Omit<Customer, 'createdAt' | 'updatedAt'> | null> {
        try {
            const customer = await prisma.customer.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    type: true,
                    email: true,
                    address: true,
                    city: true,
                    state: true,
                    postalCode: true,
                },
            });

            if (!customer) throw new Error('Customer not found');

            return customer;
        } catch (error: any) {
            throw new Error(error?.meta?.cause || error);
        }
    }

}