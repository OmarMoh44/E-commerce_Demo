import HttpError from "@errors/httpError";
import { Role } from "@prisma/client";
import Joi, { ObjectSchema, ValidationError } from "joi";


export const validateSignUp = (user: any): any => {
    validateFirstName(user.firstName);
    validateLastName(user.lastName);
    validateEmail(user.email);
    validatePassword(user.password);
    validateRole(user.role);
};

export const validateLogin = (user: any): any => {
    validateEmail(user.email);
    validatePassword(user.password);
};

export const validateFirstName = (firstName: any) => {
    const schema: ObjectSchema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(20)
            .messages({
                "string.base": "first name must be a string",
                "string.empty": "first name cannot be empty",
                "string.min": "first name must be at least 3 characters",
                "string.max": "first name must be at most 20 characters",
                "any.required": "first name is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { firstName },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};

export const validateLastName = (lastName: any) => {
    const schema: ObjectSchema = Joi.object({
        lastName: Joi.string()
            .min(3)
            .max(20)
            .messages({
                "string.base": "last name must be a string",
                "string.empty": "last name cannot be empty",
                "string.min": "last name must be at least 3 characters",
                "string.max": "last name must be at most 20 characters",
                "any.required": "last name is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { lastName },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};

export const validateEmail = (email: any) => {
    const schema: ObjectSchema = Joi.object({
        email: Joi.string()
            .email()
            .messages({
                "string.base": "email must be a string",
                "string.empty": "email cannot be empty",
                "string.email": "email must be a valid email",
                "any.required": "email is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { email },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};

export const validatePassword = (password: any) => {
    const schema: ObjectSchema = Joi.object({
        password: Joi.string()
            .min(6)
            .max(50)
            .messages({
                "string.base": "password must be a string",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 6 characters",
                "string.max": "password must be at most 50 characters",
                "any.required": "password is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { password },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};

export const validateRole = (role: any) => {
    const schema: ObjectSchema = Joi.object({
        role: Joi.valid(Role.Buyer, Role.Seller)
            .messages({
                "any.only": "role must be either 'Buyer' or 'Seller'",
                "any.required": "role is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { role },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};
