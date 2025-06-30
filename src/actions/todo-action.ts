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
import { ActionState, CategoryTag, Todo } from '@/utils/types';

export async function createTodoAction(
	taskText: string,
	dueDatetime: string | null,
	todolistId: number,
	categories: CategoryTag[]
): Promise<ActionState<Todo>> {
	const todoId = await storeTodo(taskText, dueDatetime, todolistId);
	await new Promise(resolve => setTimeout(resolve, 1500));
	if (todoId) {
		const categoryColorIds = await storeCategoriesColors(categories, todolistId);
		await storeCategories(todoId, categoryColorIds);
		const newTodo = await getTodoWithCategories(1, todolistId, todoId);
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

export async function updateTodoCompletionAction(todoId: number, isCompleted: boolean) {
	const result = await updateTodoCompletion(todoId, isCompleted);
	if (!result) console.error('Failed to update is_completed in todo');
}

export async function updateTodoImportanceAction(todoId: number, isImportant: boolean) {
	const result = await updateTodoImportance(todoId, isImportant);
	if (!result) console.error('Failed to update is_important in todo');
}

export async function deleteTodoAction(todoId: number): Promise<ActionState<void>> {
	const result = await deleteTodo(todoId);
	await new Promise(resolve => setTimeout(resolve, 1500));
	if (result) {
		return {
			message: 'Todo deleted successfully',
			success: true,
		};
	}
	console.error('Failed to delete todo');
	return {
		message: 'Failed to delete todo',
		success: false,
	};
}

export async function updateTodoTitleAction(todoId: number, title: string) {
	const result = await updateTodoTitle(todoId, title);
	await new Promise(resolve => setTimeout(resolve, 1500));
	if (result) {
		return {
			message: 'Updated todo title successfully',
			success: true,
		};
	}
	console.error('Failed to update todo title');
	return {
		message: 'Failed to update todo title',
		success: false,
	};
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
