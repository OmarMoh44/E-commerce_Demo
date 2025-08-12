import { addCategoryService, deleteCategoryService, getCategoriesService, getCategoryService, updateCategoryService } from "@services/category.service";
import { validateCategory } from "@validators/product.validator";
import { Request, Response } from "express";


export async function addCategoryController(req: Request, res: Response) {
    validateCategory(req.body.category);
    const category = req.body.category;
    const responseBody = await addCategoryService(category);
    res.status(201).json(responseBody);
}

export async function getCategoriesController(req: Request, res: Response) {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
}

export async function getCategoryController(req: Request, res: Response) {
    const categoryId = parseInt(req.params.id);
    const category = await getCategoryService(categoryId);
    res.status(200).json(category);
}

export async function updateCategoryController(req: Request, res: Response) {
    validateCategory(req.body.category);
    const categoryId = parseInt(req.params.id);
    const category = await updateCategoryService(categoryId, req.body.category);
    res.status(200).json(category);
}

export async function deleteCategoryController(req: Request, res: Response) {
    const categoryId = parseInt(req.params.id);
    await deleteCategoryService(categoryId);
    res.status(204).json({
        message: "Category deleted successfully"
    });
}