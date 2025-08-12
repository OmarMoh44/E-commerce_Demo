import asyncHandler from "express-async-handler";
import { Router } from "express";
import { sellerMiddleware } from "@middlewares/permission.middleware";
import { addCategoryController, deleteCategoryController, getCategoriesController, getCategoryController, updateCategoryController } from "@controllers/category.controller";

const router = Router();

router.post('/', sellerMiddleware, asyncHandler(addCategoryController));
router.get('/', asyncHandler(getCategoriesController));
router.get('/:id', asyncHandler(getCategoryController));
router.patch('/:id', sellerMiddleware, asyncHandler(updateCategoryController));
router.delete('/:id', sellerMiddleware, asyncHandler(deleteCategoryController));

export default router;