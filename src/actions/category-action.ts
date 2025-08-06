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

export async function updateCategoryColorAction(
	categoryColorId: number,
	todolistId: number,
	newColor: string
): Promise<ActionState<void>> {
	const result = await updateCategoryColor(categoryColorId, todolistId, newColor);
	if (result) {
		return {
			message: 'Category color updated successfully',
			success: true,
		};
	} else {
		console.error('Failed to update category color');
		return {
			message: 'Failed to update category color',
			success: false,
		};
	}
}
export async function deleteCategoryColorAction(
	categoryColorId: number,
	todolistId: number
): Promise<ActionState<void>> {
	const result = await deleteCategoryColor(categoryColorId, todolistId);
	if (result) {
		return {
			message: 'Category color deleted successfully',
			success: true,
		};
	} else {
		console.error('Failed to delete category color');
		return {
			message: 'Failed to delete category color',
			success: false,
		};
	}
}
