import prisma from '../config/db';
import { Customer } from '../models/customer.model';

export class CustomerService {
    async createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'invoices'>): Promise<Customer> {
        return await prisma.customer.create({
            data,
        });
    }

    async updateCustomer(id: number, data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'invoices'>>): Promise<Customer | null> {
        return await prisma.customer.update({
            where: { id },
            data,
        });
    }

    async listCustomers(): Promise<Omit<Customer, 'createdAt' | 'updatedAt'>[]> {
        return await prisma.customer.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    type: true,
                    email: true,
                    address: true,
                    city: true,
                    state: true,
                    postalCode: true
                },
            }
        );
    }

    async deleteCustomer(id: number): Promise<Customer | null> {
        return await prisma.customer.delete({
            where: { id },
        });
    }

    async findCustomerById(id: number): Promise<Omit<Customer, 'createdAt' | 'updatedAt'> | null> {
        return await prisma.customer.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                type: true,
                email: true,
                address: true,
                city: true,
                state: true,
                postalCode: true
            },
        });
    }
}