'use server';

import { storeCategories, storeCategoriesColors } from '@/lib/category';
import { deleteTodo, storeTodo, updateTodoCompletion, updateTodoTitle } from '@/lib/todo';
import { revalidatePath } from 'next/cache';

export async function createTodoAction(
	taskText: string,
	dueDatetime: string | null,
	todolistId: number,
	categories: string[]
): Promise<number | null> {
	const todoId: number = await storeTodo(taskText, dueDatetime, todolistId);
	const categoryColorsId = await storeCategoriesColors(categories, todolistId);
	const validCategoryIds = categoryColorsId.filter((id): id is number => id !== undefined);
	await storeCategories(todoId, validCategoryIds);

	if (todoId) {
		return todoId;
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

export async function deleteTodoAction(todoId: number, todolistId: number) {
	const result = await deleteTodo(todoId);

	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to delete todo');
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
