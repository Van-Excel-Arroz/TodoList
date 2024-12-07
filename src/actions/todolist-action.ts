'use server';

import {
	createCategoryColor,
	deleteCategory,
	deleteTodo,
	storeCategories,
	storeCategoriesColors,
	storeCategory,
	storeTodo,
	updateIsSelectedCategoryColors,
	updateTodoCompletion,
	updateTodoTitle,
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
	const validCategoryIds = categoryColorsId.filter((id): id is number => id !== undefined);
	await storeCategories(todoId, validCategoryIds);

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

export async function deleteTodoAction(todoId: number, todolistId: number) {
	const result = await deleteTodo(todoId);

	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to delete todo');
	}
}

export async function addTodoCategoryAction(
	categoryTitle: string,
	hexColor: string,
	todolistId: number,
	todoId: number
): Promise<number | undefined> {
	const categoryColorsId = await createCategoryColor(categoryTitle, hexColor, todolistId);
	const categoryId = await storeCategory(todoId, categoryColorsId!);

	if (categoryId) {
		revalidatePath(`/tasks/${todolistId}`);
		return categoryId;
	} else {
		console.error('Failed to add category to todo');
		return;
	}
}

export async function deleteTodoCategoryAction(categoryId: number, todolistId: number) {
	const result = await deleteCategory(categoryId);

	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to delete category from todo');
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
