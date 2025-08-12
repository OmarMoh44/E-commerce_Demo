import HttpError from "@errors/httpError";
import Joi, { ObjectSchema, ValidationError } from "joi";

export function validateProductId(productId: any) {
    const schema: ObjectSchema = Joi.object({
        id: Joi.number().integer().min(1).required()
    });

    const { error } = schema.validate({ id: productId });

    if (error) {
        throw new HttpError(`Invalid Product ID: ${error.message}`, 400);
    }
}


export function validateQuantity(quantity: any) {
    const schema: ObjectSchema = Joi.object({
        quantity: Joi.number().integer().min(1).required()
    });

    const { error } = schema.validate({ quantity });

    if (error) {
        throw new HttpError(`Invalid Quantity: ${error.message}`, 400);
    }
}