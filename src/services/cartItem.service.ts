import HttpError from "@errors/httpError";
import { findCartById } from "@repositories/cart.repository";
import { addCartItemToCart, findCartItemById, findCartItemsByCart, updateCartItem } from "@repositories/cartItem.repository";
import { findProductById } from "@repositories/product.repository";


export async function findCartItemsByCartService(cartId: number) {
    return await findCartItemsByCart(cartId);
}

export async function addCartItemToCartService(cartId: number, productId: number, quantity: number) {
    const cart = await findCartById(cartId);
    if (!cart) throw new HttpError("Cart is not found", 400);
    const product = await findProductById(productId);
    if (!product) throw new HttpError("Product is not found", 400);
    const cartItem = await addCartItemToCart(cartId, productId, quantity);
    return cartItem;
}

export async function findCartItemService(cartItemId: number) {
    const cartItem = await findCartItemById(cartItemId);
    if (!cartItem)
        throw new HttpError("Cart item is not found", 400);
    return cartItem;
}

export async function updateCartItemService(cartItemId: number, carItemData: any) {
    const foundCartItem = await findCartItemById(cartItemId);
    if (!foundCartItem) throw new HttpError("cart item not found", 404);
    let updatedData = {};
    const cartItemAttributes = ['productId', 'quantity'];
    cartItemAttributes.forEach(attr => {
        if (carItemData[attr] !== undefined) {
            (updatedData as any)[attr] = carItemData[attr];
        }
    });
    return await updateCartItem(cartItemId, updatedData);
}