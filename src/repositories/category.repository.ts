import prisma from "@DB";
import HttpError from "@errors/httpError";

export async function findAllCategory() {
    return await prisma.category.findMany({
        include: { products: true }
    });
}

export async function findCategoryById(categoryId: number) {
    return await prisma.category.findUnique({
        where: { id: categoryId }
    });
}

export async function findCategoryByName(name: string) {
    return await prisma.category.findUnique({
        where: { name }
    });
}

export async function addCategory(name: string) {
    try {
        return await prisma.category.create({
            data: { name }
        })
    } catch (error) {
        throw new HttpError("Error adding category", 500);
    }
}

export async function updateCategory(categoryId: number, name: string) {
    try {
        return await prisma.category.update({
            where: { id: categoryId },
            data: { name }
        });
    } catch (error) {
        throw new HttpError("Error updating category", 500);
    }
}

export async function deleteCategory(categoryId: number) {
    try {
        return await prisma.category.delete({
            where: { id: categoryId }
        });
    } catch (error) {
        throw new HttpError("Error deleting category", 500);
    }
}