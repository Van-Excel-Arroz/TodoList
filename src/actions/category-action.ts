'use server';

import { createCategoryColor, deleteCategory, storeCategory, updateIsSelectedCategoryColors } from '@/lib/category';

export async function addTodoCategoryAction(
	categoryTitle: string,
	hexColor: string,
	todolistId: number,
	todoId: number
): Promise<number | undefined> {
	const categoryColorsId = await createCategoryColor(categoryTitle, hexColor, todolistId);
	const categoryId = await storeCategory(todoId, categoryColorsId!);

	if (categoryId) {
		return categoryId;
	} else {
		console.error('Failed to add category to todo');
		return;
	}
}

export async function deleteTodoCategoryAction(categoryId: number) {
	const result = await deleteCategory(categoryId);

	if (!result) console.error('Failed to delete category from todo');
}
