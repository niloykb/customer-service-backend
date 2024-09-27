import { body } from 'express-validator';

const commonCustomerValidationRules = () => [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address'),
    body('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['I', 'B', 'i', 'b']).withMessage('Invalid Business Type'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('postalCode').notEmpty().withMessage('Postal code is required'),
];

export const storeCustomerValidationRules = commonCustomerValidationRules();
export const updateCustomerValidationRules = commonCustomerValidationRules();

export const partialUpdateCustomerValidationRules = [
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