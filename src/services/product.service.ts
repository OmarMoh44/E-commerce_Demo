import HttpError from "@errors/httpError";
import { findCategoryByName } from "@repositories/category.repository";
import { addProduct, deleteProductById, findAllProducts, findProductById, updateProduct } from "@repositories/product.repository";

export const addProductSerivce = async (productData: any, sellerId: number) => {
    const productAttributes = {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
    };
    const category = await findCategoryByName(productData.category);
    if (!category) throw new HttpError("Category is Invlaid", 400);
    return await addProduct(productAttributes, sellerId);
};

export const getProductsService = async () => {
    return await findAllProducts();
};

export const getProductService = async (productId: string) => {
    const product = await findProductById(parseInt(productId));
    if (!product) throw new HttpError("Product not found", 404);
    return product;
};

export async function deleteProductService(productId: string, userId: number) {
    const product = await findProductById(parseInt(productId));
    if (!product) throw new HttpError("Product not found", 404);
    if (product.seller_id !== userId) throw new HttpError("Unauthorized", 403);
    await deleteProductById(parseInt(productId));
}

export async function updateProductService(productData: any, productId: string, sellerId: number) {
    const product = await findProductById(parseInt(productId));
    if (!product) throw new HttpError("Product not found", 404);
    if (product.seller_id !== sellerId) throw new HttpError("Unauthorized", 403);
    let updatedData = {};
    const productAttributes = ['title', 'description', 'price'];
    productAttributes.forEach(attr => {
        if (productData[attr] !== undefined) {
            (updatedData as any)[attr] = productData[attr];
        }
    });
    if (productData['category'] !== undefined) {
        const category = await findCategoryByName(productData['category']);
        if (!category) throw new HttpError("Category is Invlaid", 400);
        (updatedData as any).category_id = category.id;
    }
    return await updateProduct(updatedData, parseInt(productId));
}   