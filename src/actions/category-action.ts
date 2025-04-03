'use server';

import { deleteCategory, storeCategories } from '@/lib/category';

export async function addTodoCategoriesAction(categoryColorsIds: number[], todoId: number) {
	await storeCategories(todoId, categoryColorsIds);
}

export async function deleteTodoCategoryAction(categoryId: number) {
	const result = await deleteCategory(categoryId);

	if (!result) console.error('Failed to delete category from todo');
}
