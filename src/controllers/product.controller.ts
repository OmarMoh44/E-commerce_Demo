import { addProductSerivce, deleteProductService, getProductService, getProductsService, updateProductService } from "@services/product.service";
import { validateCategory, validateDescription, validatePrice, validateProduct, validateTitle } from "@validators/product.validator";
import { Request, Response } from "express";


export async function addProductController(req: Request, res: Response) {
    const userId = req.userId;
    const productData = req.body;
    validateProduct(productData);
    const responseBody = await addProductSerivce(productData, userId);
    res.status(201).json(responseBody);
}

export async function getProductsController(req: Request, res: Response) {
    const responseBody = await getProductsService();
    res.status(200).json(responseBody);
}

export async function getProductController(req: Request, res: Response) {
    const productId = req.params.id;
    const responseBody = await getProductService(productId);
    res.status(200).json(responseBody);
}

export async function deleteProductController(req: Request, res: Response) {
    const userId = req.userId;
    const productId = req.params.id;
    await deleteProductService(productId, userId);
    res.status(204).json({
        message: "Product deleted successfully"
    });
}

export async function updateProductController(req: Request, res: Response) {
    const userId = req.userId;
    const productId = req.params.id;
    const productData = req.body;
    if (productData['title']) validateTitle(productData['title']);
    if (productData['description']) validateDescription(productData['description']);
    if (productData['price']) validatePrice(productData['price']);
    if (productData['category']) validateCategory(productData['category']);
    const udpatedProduct = await updateProductService(productData, productId, userId);
    res.json(udpatedProduct);
}