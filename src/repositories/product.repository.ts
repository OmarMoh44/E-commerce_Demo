import prisma from "@DB";
import HttpError from "@errors/httpError";

export const addProduct = async (productData: any, sellerId: number) => {
    try {
        const product = await prisma.product.create({
            data: {
                title: productData.title,
                description: productData.description,
                price: productData.price,
                seller: {
                    connect: { id: sellerId },
                },
                category: {
                    connect: { name: productData.category },
                },
            },
        });
        return product;
    } catch (error) {
        throw new HttpError("Error adding product", 500);
    }
};

export async function findAllProducts() {
    return await prisma.product.findMany({
        include: { category: true, seller: true }
    });
}

export async function findProductById(productId: number) {
    return await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true, seller: true }
    });
}

export async function deleteProductById(productId: number) {
    await prisma.product.delete({
        where: { id: productId }
    });
}

export async function updateProduct(productData: any, productId: number) {
    try {
        return await prisma.product.update({
            where: { id: productId },
            data: productData
        })
    } catch (error) {
        throw new HttpError("Error updating product", 500);

    }
}