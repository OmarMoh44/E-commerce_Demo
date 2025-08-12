import { AddCartItemsToCartController, findCartItemController, findCartItemsByCartController, updateCartItemController } from "@controllers/cartItem.controller";
import { Router } from "express";
import asyncHandler from "express-async-handler";


const router = Router();

router.get('/:cartId', asyncHandler(findCartItemsByCartController));
router.post('/:cartId', asyncHandler(AddCartItemsToCartController));
router.get('/:cartItemId', asyncHandler(findCartItemController));
router.patch('/:cartItemId', asyncHandler(updateCartItemController));

export default router;