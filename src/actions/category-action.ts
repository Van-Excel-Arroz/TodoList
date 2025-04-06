'use server';

import { removeCategoryFromTodo, storeCategories } from '@/lib/category';

export async function addTodoCategoriesAction(categoryColorsIds: number[], todoId: number) {
	await storeCategories(todoId, categoryColorsIds);
}

export async function removeCategoryFromTodoAction(categoryColorId: number, todoId: number) {
	const result = await removeCategoryFromTodo(categoryColorId, todoId);

	if (!result) console.error('Failed to delete category from todo');
}
