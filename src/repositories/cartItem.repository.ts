import prisma from "@DB";
import HttpError from "@errors/httpError";

export async function findCartItemsByCart(cartId: number) {
    return await prisma.cartItem.findMany({
        where: {
            cart_id: cartId
        }
    });
}

export async function findCartItemById(cartItemId: number) {
    return await prisma.cartItem.findUnique({
        where: {
            id: cartItemId
        }
    });
}

export async function addCartItemToCart(cartId: number, productId: number, quantity: number) {
    try {
        return await prisma.cartItem.create({
            data: {
                cart_id: cartId,
                product_id: productId,
                quantity: quantity
            }
        });
    } catch (error) {
        throw new HttpError("Error in adding new cart item", 500);
    }
}

export async function updateCartItem(cartItemId: number, cartItemData: any) {
    try {
        return await prisma.cartItem.update({
            where: { id: cartItemId },
            data: cartItemData
        })
    } catch (error) {
        throw new HttpError("Error updating cart item", 500);

    }
}