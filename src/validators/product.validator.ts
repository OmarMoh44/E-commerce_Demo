import HttpError from "@errors/httpError";
import Joi, { ObjectSchema, ValidationError } from "joi";

export const validateProduct = (product: any) => {
    validateTitle(product.title);
    validateDescription(product.description);
    validatePrice(product.price);
    validateCategory(product.category);
};

export const validateTitle = (title: any) => {
    const schema: ObjectSchema = Joi.object({
        title: Joi.string()
            .min(3)
            .max(100)
            .messages({
                "string.base": "title must be a string",
                "string.empty": "title cannot be empty",
                "string.min": "title must be at least 3 characters",
                "string.max": "title must be at most 100 characters",
                "any.required": "title is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { title },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};

export const validateDescription = (description: any) => {
    const schema: ObjectSchema = Joi.object({
        description: Joi.string()
            .min(10)
            .max(500)
            .messages({
                "string.base": "description must be a string",
                "string.empty": "description cannot be empty",
                "string.min": "description must be at least 10 characters",
                "string.max": "description must be at most 500 characters",
                "any.required": "description is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { description },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};

export const validatePrice = (price: any) => {
    const schema: ObjectSchema = Joi.object({
        price: Joi.number()
            .min(0)
            .messages({
                "number.base": "price must be a number",
                "number.min": "price must be at least 0",
                "any.required": "price is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { price },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};

export const validateCategory = (category: any) => {
    const schema: ObjectSchema = Joi.object({
        category: Joi.string()
            .min(3)
            .max(50)
            .messages({
                "string.base": "category must be a string",
                "string.empty": "category cannot be empty",
                "string.min": "category must be at least 3 characters",
                "string.max": "category must be at most 50 characters",
                "any.required": "category is required",
            })
            .required(),
    });
    const error: ValidationError | undefined = schema.validate(
        { category },
        { abortEarly: false }
    ).error;
    if (error) {
        throw new HttpError(error.details[0].message, 422);
    }
};