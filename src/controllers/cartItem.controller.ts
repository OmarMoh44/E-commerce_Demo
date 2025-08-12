import { addCartItemToCartService, findCartItemsByCartService, findCartItemService, updateCartItemService } from "@services/cartItem.service";
import { validateProductId, validateQuantity } from "@validators/cartItem.validator";
import { Request, Response } from "express";

export async function findCartItemsByCartController(req: Request, res: Response) {
    const cartId = req.params.cartId;
    const cartItems = await findCartItemsByCartService(parseInt(cartId));
    res.status(200).json(cartItems);
}

export async function AddCartItemsToCartController(req: Request, res: Response) {
    const cartId = req.params.cartId;
    const newItem = req.body;
    validateProductId(newItem.productId);
    validateQuantity(newItem.quantity);
    const addedItem = await addCartItemToCartService(parseInt(cartId), newItem.productId, newItem.quantity);
    res.status(201).json(addedItem);
}

export async function findCartItemController(req: Request, res: Response) {
    const cartItemId = req.params.cartItemId;
    const cartItem = await findCartItemService(parseInt(cartItemId));
    res.status(200).json(cartItem);
}

export async function updateCartItemController(req: Request, res: Response) {
    const cartItemId = req.params.cartItemId;
    const updatedData = req.body;
    if (updatedData['productId']) validateProductId(updatedData['productId']);
    if (updatedData['quantity']) validateQuantity(updatedData['quantity']);
    const updatedCartItem = await updateCartItemService(parseInt(cartItemId), updatedData);
    res.status(200).json(updatedCartItem);
}