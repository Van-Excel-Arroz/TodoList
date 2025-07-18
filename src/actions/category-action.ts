'use server';

import {
	createCategoryColor,
	deleteCategoryColor,
	removeCategoryFromTodo,
	storeCategories,
	updateCategoryColor,
} from '@/lib/category';
import { ActionState } from '@/utils/types';

export async function addTodoCategoriesAction(categoryColorsIds: number[], todoId: number) {
	await storeCategories(todoId, categoryColorsIds);
}

export async function addCategoryColorAction(title: string, hexColor: string, todolistId: number) {
	const newCategoryId = createCategoryColor(title, hexColor, todolistId);

	if (newCategoryId) {
		return newCategoryId;
	} else {
		console.error('Failed to insert new category from category colors.');
	}
}

export async function removeCategoryFromTodoAction(
	categoryColorId: number,
	todoId: number
): Promise<ActionState<void>> {
	const result = await removeCategoryFromTodo(categoryColorId, todoId);
	if (result) {
		return {
			message: 'Category removed from todo successfully',
			success: true,
		};
	} else {
		console.error('Failed to remove category from todo');
		return {
			message: 'Failed to remove category from todo',
			success: false,
		};
	}
}

export async function updateCategoryColorAction(categoryColorId: number, todolistId: number, newColor: string) {
	const result = await updateCategoryColor(categoryColorId, todolistId, newColor);

	if (!result) console.error('Failed to update hex_color from category_color');
}
export async function deleteCategoryColorAction(categoryColorId: number, todolistId: number) {
	const result = await deleteCategoryColor(categoryColorId, todolistId);

	if (!result) console.error('Failed to delete category_color');
}
