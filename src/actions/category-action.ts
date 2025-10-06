'use server';

import {
	createCategoryColor,
	deleteCategoryColor,
	removeCategoryFromTodo,
	storeCategories,
	updateCategoryColor,
} from '@/lib/category';
import { createActionResponse } from '@/utils/action-helper';
import { ActionState } from '@/utils/types';

export async function addTodoCategoriesAction(categoryColorsIds: number[], todoId: number) {
	await storeCategories(todoId, categoryColorsIds);
}

export async function addCategoryColorAction(
	title: string,
	hexColor: string,
	todolistId: number
): Promise<ActionState<number | null>> {
	const newCategoryId = await createCategoryColor(title, hexColor, todolistId);

	if (newCategoryId !== null && newCategoryId) {
		return {
			message: 'New category created successfully',
			success: true,
			data: newCategoryId,
		};
	} else {
		console.error('Failed to create new category');
		return {
			message: 'Failed to create new category',
			success: false,
			data: null,
		};
	}
}

export async function removeCategoryFromTodoAction(
	categoryColorId: number,
	todoId: number
): Promise<ActionState<void>> {
	const result = await removeCategoryFromTodo(categoryColorId, todoId);
	return createActionResponse(result, 'Category removed from todo successfully', 'Failed to remove category from todo');
}

export async function updateCategoryColorAction(
	categoryColorId: number,
	todolistId: number,
	newColor: string
): Promise<ActionState<void>> {
	const result = await updateCategoryColor(categoryColorId, todolistId, newColor);
	return createActionResponse(result, 'Category color updated successfully', 'Failed to update category color');
}

export async function deleteCategoryColorAction(
	categoryColorId: number,
	todolistId: number
): Promise<ActionState<void>> {
	const result = await deleteCategoryColor(categoryColorId, todolistId);
	return createActionResponse(result, 'Category color deleted successfully', 'Failed to delete category color');
}
