'use server';

import { createCategoryColor, deleteCategory, storeCategory } from '@/lib/category';

export async function addTodoCategoryAction(
	categoryTitle: string,
	hexColor: string,
	todolistId: number,
	todoId: number
): Promise<number | undefined> {
	const categoryColorsId = await createCategoryColor(categoryTitle, hexColor, todolistId);

	if (categoryColorsId) {
		const categoryId = await storeCategory(todoId, categoryColorsId);
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
