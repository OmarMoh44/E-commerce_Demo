import HttpError from "@errors/httpError";
import { addCategory, deleteCategory, findAllCategory, findCategoryById, findCategoryByName, updateCategory } from "@repositories/category.repository";

export async function addCategoryService(categoryName: string) {
    const foundCategory = await findCategoryByName(categoryName);
    if (foundCategory)
        throw new HttpError("Category with name: " + categoryName + " already exist", 422);
    return await addCategory(categoryName);
}

export async function getCategoriesService() {
    return await findAllCategory();
}

export async function getCategoryService(categoryId: number) {
    const category = await findCategoryById(categoryId);
    if (!category)
        throw new HttpError("Category with id: " + categoryId + " not found", 422);
    return category
}

export async function updateCategoryService(categoryId: number, categoryName: string) {
    const categoryById = await findCategoryById(categoryId);
    if (!categoryById) {
        throw new HttpError("Category with id: " + categoryId + " not found", 422);
    }
    const categoryByName = await findCategoryByName(categoryName);
    if (categoryByName && categoryByName.id !== categoryId) {
        throw new HttpError("Category with name: " + categoryName + " already exists", 422);
    }
    const updatedCategory = await updateCategory(categoryId, categoryName);
    return updatedCategory;
}

export async function deleteCategoryService(categoryId: number) {
    const category = await findCategoryById(categoryId);
    if (!category) {
        throw new HttpError("Category with id: " + categoryId + " not found", 422);
    }
    await deleteCategory(categoryId);
}
