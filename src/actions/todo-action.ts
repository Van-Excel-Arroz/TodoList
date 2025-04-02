'use server';

import { storeCategories, storeCategoriesColors } from '@/lib/category';
import {
	deleteTodo,
	deleteTodoDueDate,
	getTodoWithCategories,
	storeTodo,
	updateTodoCompletedAt,
	updateTodoCompletion,
	updateTodoDescription,
	updateTodoDueDate,
	updateTodoImportance,
	updateTodoTitle,
} from '@/lib/todo';
import { CategoryTag } from '@/utils/types';

export async function createTodoAction(
	taskText: string,
	dueDatetime: string | null,
	todolistId: number,
	categories: CategoryTag[]
) {
	const todoId = await storeTodo(taskText, dueDatetime, todolistId);
	if (todoId) {
		const categoryColorsId = await storeCategoriesColors(categories, todolistId);
		await storeCategories(todoId, categoryColorsId);
		const newTodo = getTodoWithCategories(1, todolistId, todoId);
		return newTodo;
	} else {
		console.error('Failed to create the todo');
		return null;
	}
}

export async function updateTodoCompletionAction(todoId: number, isCompleted: boolean) {
	const result = await updateTodoCompletion(todoId, isCompleted);
	if (!result) console.error('Failed to update is_completed in todo');
}

export async function updateTodoImportanceAction(todoId: number, isImportant: boolean) {
	const result = await updateTodoImportance(todoId, isImportant);
	if (!result) console.error('Failed to update is_important in todo');
}

export async function deleteTodoAction(todoId: number) {
	const result = await deleteTodo(todoId);
	if (!result) console.error('Failed to delete todo');
}

export async function updateTodoTitleAction(todoId: number, title: string) {
	const result = await updateTodoTitle(todoId, title);
	if (!result) console.error('Failed to update todo title');
}

export async function updateTodoDueDateAction(todoId: number, dueDate: string) {
	const result = await updateTodoDueDate(todoId, dueDate);
	if (!result) console.error('Failed to update todo due date');
}

export async function deleteTodoDueDateAction(todoId: number) {
	const result = await deleteTodoDueDate(todoId);
	if (!result) console.error('Failed to delete todo due date');
}

export async function updateTodoDescriptionAction(todoId: number, description: string | null) {
	const result = await updateTodoDescription(todoId, description);
	if (!result) console.error('Failed to update todo description');
}

export async function updateTodoCompletedAtAction(todoId: number, completedAt: string | null) {
	const result = await updateTodoCompletedAt(todoId, completedAt);
	if (!result) console.error('Failed to update todo completedAt');
}
