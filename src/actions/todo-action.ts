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
import { createActionResponse } from '@/utils/action-helper';
import { ActionState, CategoryTag, Todo } from '@/utils/types';

export async function createTodoAction(
	taskText: string,
	dueDatetime: string | null,
	todolistId: number,
	userId: number,
	categories: CategoryTag[]
): Promise<ActionState<Todo>> {
	const todoId = await storeTodo(taskText, dueDatetime, todolistId);
	if (todoId) {
		const categoryColorIds = await storeCategoriesColors(categories, todolistId);
		await storeCategories(todoId, categoryColorIds);
		const newTodo = await getTodoWithCategories(userId, todolistId, todoId);
		if (newTodo) {
			return {
				success: true,
				message: 'Todo created successfully',
				data: newTodo,
			};
		}
	}
	console.error('Failed to create the todo');
	return {
		success: false,
		message: 'Failed to create the todo',
	};
}

export async function updateTodoCompletionAction(todoId: number, isCompleted: boolean): Promise<ActionState<void>> {
	const result = await updateTodoCompletion(todoId, isCompleted);
	return createActionResponse(result, 'Todo completion updated successfully', 'Failed to update todo completion');
}

export async function updateTodoImportanceAction(todoId: number, isImportant: boolean): Promise<ActionState<void>> {
	const result = await updateTodoImportance(todoId, isImportant);
	return createActionResponse(result, 'Todo importance updated successfully', 'Failed to update todo importance');
}

export async function deleteTodoAction(todoId: number): Promise<ActionState<void>> {
	const result = await deleteTodo(todoId);
	return createActionResponse(result, 'Todo deleted successfully', 'Failed to delete todo');
}

export async function updateTodoTitleAction(todoId: number, title: string): Promise<ActionState<void>> {
	const result = await updateTodoTitle(todoId, title);
	return createActionResponse(result, 'Todo title updated successfully', 'Failed to update todo title');
}

export async function updateTodoDueDateAction(todoId: number, dueDate: string): Promise<ActionState<void>> {
	const result = await updateTodoDueDate(todoId, dueDate);
	return createActionResponse(result, 'Todo due date updated successfully', 'Failed to update todo due date');
}

export async function deleteTodoDueDateAction(todoId: number): Promise<ActionState<void>> {
	const result = await deleteTodoDueDate(todoId);
	return createActionResponse(result, 'Todo due date deleted successfully', 'Failed to delete todo due date');
}

export async function updateTodoDescriptionAction(todoId: number, description: string | null) {
	const result = await updateTodoDescription(todoId, description);
	return createActionResponse(result, 'Todo description updated successfully', 'Failed to update todo description');
}

export async function updateTodoCompletedAtAction(todoId: number, completedAt: string | null) {
	const result = await updateTodoCompletedAt(todoId, completedAt);
	return createActionResponse(result, 'Todo completed at updated successfully', 'Failed to update todo completed at');
}
