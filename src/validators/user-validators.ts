import prisma from '../config/db';
import { body } from 'express-validator';

export const registerValidationRules = [
    body('email')
        .isEmail().withMessage('Enter a valid email address')
        .custom(async (value) => {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: value,
                },
            });
            if (existingUser) {
                throw new Error('E-mail already in use');
            }
        }),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain a lowercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain a special character'),
    body('name').notEmpty().withMessage('Name is required'),
];

export const loginValidationRules = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];