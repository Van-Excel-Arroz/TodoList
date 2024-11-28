'use server';

import {
	storeCategories,
	storeCategoriesColors,
	storeTodo,
	updateIsSelectedCategoryColors,
	updateTodoCompletion,
} from '@/lib/todo';
import { deleteTodolist, storeTodolist, updateTodolist } from '@/lib/todolist';
import { revalidatePath } from 'next/cache';

export async function createTodolist(title: string) {
	const todolistId = await storeTodolist(title, 1);
	if (todolistId) {
		revalidatePath(`/tasks/${todolistId}`);
	}
	return todolistId;
}

export async function createTodoAction(
	taskText: string,
	dueDatetime: string | null,
	todolistId: number,
	categories: string[]
) {
	const todoId: number = await storeTodo(taskText, dueDatetime, todolistId);
	const categoryColorsId = await storeCategoriesColors(categories, todolistId);
	await storeCategories(todoId, categoryColorsId);

	if (todoId) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to create the todo');
		return null;
	}
}

export async function deleteTodolistAction(todolistId: number, user_id: number) {
	const result = await deleteTodolist(todolistId, user_id);
	if (result) {
		revalidatePath(`/tasks/home`);
	} else {
		console.error('Failed to delete the todolist');
	}
}

export async function updateTodolistAction(todolistId: number, title: string) {
	const result = await updateTodolist(todolistId, title);
	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to update the todolist');
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

export async function updateIsSelectedCategoryColorsAction(
	categoryTitle: string,
	isSelected: boolean,
	todolistId: number
) {
	const result = await updateIsSelectedCategoryColors(categoryTitle, isSelected);
	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to update is_selected in category_colors');
	}
}
