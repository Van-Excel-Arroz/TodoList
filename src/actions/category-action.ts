'use server';

import { deleteCategory, storeCategories } from '@/lib/category';

export async function addTodoCategoriesAction(categoryColorsIds: number[], todoId: number) {
	await storeCategories(todoId, categoryColorsIds);
}

export async function deleteTodoCategoryAction(categoryColorId: number, todoId: number) {
	const result = await deleteCategory(categoryColorId, todoId);

	if (!result) console.error('Failed to delete category from todo');
}
