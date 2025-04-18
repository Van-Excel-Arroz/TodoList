'use server';

import { removeCategoryFromTodo, storeCategories, updateCategoryColor } from '@/lib/category';

export async function addTodoCategoriesAction(categoryColorsIds: number[], todoId: number) {
	await storeCategories(todoId, categoryColorsIds);
}

export async function removeCategoryFromTodoAction(categoryColorId: number, todoId: number) {
	const result = await removeCategoryFromTodo(categoryColorId, todoId);

	if (!result) console.error('Failed to delete category from todo');
}

export async function updateCategoryColorAction(categoryColorId: number, todolistId: number, newColor: string) {
	const result = await updateCategoryColor(categoryColorId, todolistId, newColor);

	if (!result) console.error('Failed to update hex_color from category_color');
}
