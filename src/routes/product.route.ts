import asyncHandler from "express-async-handler";
import { Router } from "express";
import { addProductController, deleteProductController, getProductController, getProductsController, updateProductController } from "@controllers/product.controller";
import { sellerMiddleware } from "@middlewares/permission.middleware";

const router = Router();

router.post('/', sellerMiddleware, asyncHandler(addProductController))
router.get('/', asyncHandler(getProductsController))
router.get('/:id', asyncHandler(getProductController))
router.delete('/:id', sellerMiddleware, asyncHandler(deleteProductController))
router.patch('/:id', sellerMiddleware, asyncHandler(updateProductController))

export default router;