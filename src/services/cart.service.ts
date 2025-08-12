import HttpError from "@errors/httpError";
import { createCart, deleteCart, findCartByUserId } from "@repositories/cart.repository";

export async function addCartService(userId: number) {
    const existingCart = await findCartByUserId(userId);
    if (existingCart) {
        throw new HttpError("Cart already exists", 400);
    }
    return await createCart(userId);
}

export async function deleteCartService(userId: number) {
    const existingCart = await findCartByUserId(userId);
    if (!existingCart) {
        throw new HttpError("Cart not found", 404);
    }
    await deleteCart(userId);
}