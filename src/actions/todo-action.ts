'use server';

import { getCategoryColor, storeCategories, storeCategoriesColors } from '@/lib/category';
import { deleteTodo, storeTodo, updateTodoCompletion, updateTodoTitle } from '@/lib/todo';
import { Category } from '@/types';
import { revalidatePath } from 'next/cache';

export async function createTodoAction(
	taskText: string,
	dueDatetime: string | null,
	todolistId: number,
	categories: string[]
) {
	const todoId: number = await storeTodo(taskText, dueDatetime, todolistId);
	const categoryColorsId = await storeCategoriesColors(categories, todolistId);
	const validCategoryIds = categoryColorsId.filter((id): id is number => id !== undefined);
	await storeCategories(todoId, validCategoryIds);

	const categoriesWithDetails = await Promise.all(
		categories.map(async title => {
			const category = await getCategoryColor(title, todolistId);
			return category
				? {
						id: category.id,
						category_title: category.category_title,
						hex_color: category.hex_color,
						is_selected: false,
						todo_list_id: todolistId,
				  }
				: null;
		})
	);
	const validCategories = categoriesWithDetails.filter(Boolean) as Category[];

	if (todoId) {
		return { validCategories, todoId };
	} else {
		console.error('Failed to create the todo');
		return null;
	}
}

export async function updateTodoCompletionAction(todoId: number, isCompleted: boolean, todolistId: number) {
	const result = await updateTodoCompletion(todoId, isCompleted);
	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to update is_completed in todo');
	}
}

export async function deleteTodoAction(todoId: number, todolistId: number): Promise<boolean> {
	const result = await deleteTodo(todoId);

	if (result) {
		return true;
	} else {
		console.error('Failed to delete todo');
		return false;
	}
}

export async function updateTodoTitleAction(todoId: number, title: string, todolistId: number) {
	const result = await updateTodoTitle(todoId, title);
	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to update todo title');
	}
}
