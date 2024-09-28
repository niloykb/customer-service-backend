import prisma from '../config/db';
import { body, param } from 'express-validator';

const commonCustomerValidationRules = () => [

    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address '),
    body('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['I', 'B', 'i', 'b']).withMessage('Invalid Business Type'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('postalCode').notEmpty().withMessage('Postal code is required'),
];

const existenceValidationsRules = () => [
    param('id').custom(async (id) => {
        const customer = await prisma.customer.findUnique({
            where: { id: Number(id) },
        });
        if (!customer) {
            throw new Error('Customer not found');
        }
        return true;
    }),
];

const updateValidationsRules = () => [
    ...existenceValidationsRules(),
    ...commonCustomerValidationRules()
];

const storeValidationsRules = () => [
    ...commonCustomerValidationRules(),
    body('email')
        .custom(async (value) => {
            const existingUser = await prisma.customer.findUnique({
                where: { email: value },
            });
            if (existingUser) {
                throw new Error('E-mail already in use');
            }
        }),
];

export const storeCustomerValidationRules = storeValidationsRules();
export const updateCustomerValidationRules = updateValidationsRules();

export const partialUpdateCustomerValidationRules = [
    ...existenceValidationsRules(),
    body('name').optional().notEmpty().withMessage('Name cannot be empty if provided'),
    body('email')
        .optional()
        .isEmail().withMessage('Enter a valid email address')
        .notEmpty().withMessage('Email cannot be empty if provided'),
    body('type')
        .optional()
        .notEmpty().withMessage('Type cannot be empty if provided')
        .isIn(['I', 'B', 'i', 'b']).withMessage('Invalid Business Type'),
    body('address').optional().notEmpty().withMessage('Address is required'),
    body('city').optional().notEmpty().withMessage('City is required'),
    body('state').optional().notEmpty().withMessage('State is required'),
    body('postalCode').optional().notEmpty().withMessage('Postal code is required'),
];
