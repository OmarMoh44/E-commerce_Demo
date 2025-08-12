import prisma from "@DB";
import HttpError from "@errors/httpError";

export async function findCartById(cartId: number) {
    return await prisma.cart.findUnique({
        where: {id: cartId}
    })
}

export async function findCartByUserId(userId: number) {
    return await prisma.cart.findFirst({
        where: { user_id: userId }
    });
}

export async function createCart(userId: number) {
    try {
        const cart = await prisma.cart.create({
            data: {
                user: {
                    connect: { id: userId }
                }
            }
        });
        return cart;
    } catch (e) {
        throw new HttpError("Error adding cart", 500);
    }
}

export async function deleteCart(userId: number) {
    await prisma.cart.delete({
        where: { user_id: userId }
    })
}
