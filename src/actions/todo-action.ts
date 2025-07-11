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

export async function updateTodoCompletionAction(todoId: number, isCompleted: boolean): Promise<ActionState<void>> {
	const result = await updateTodoCompletion(todoId, isCompleted);
	if (result) {
		return {
			success: true,
			message: 'Todo completion updated successfully',
		};
	} else {
		console.error('Failed to update todo completion');
		return {
			success: false,
			message: 'Failed to update todo completion',
		};
	}
}

export async function updateTodoImportanceAction(todoId: number, isImportant: boolean): Promise<ActionState<void>> {
	const result = await updateTodoImportance(todoId, isImportant);
	if (result) {
		return {
			success: true,
			message: 'Todo importance updated successfully',
		};
	} else {
		console.error('Failed to update todo importance');
		return {
			success: false,
			message: 'Failed to update todo importance',
		};
	}
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

export async function updateTodoTitleAction(todoId: number, title: string): Promise<ActionState<void>> {
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

export async function updateTodoDueDateAction(todoId: number, dueDate: string): Promise<ActionState<void>> {
	const result = await updateTodoDueDate(todoId, dueDate);
	await new Promise(resolve => setTimeout(resolve, 1500));
	if (result) {
		return {
			message: 'Updated todo due date successfully',
			success: true,
		};
	}
	console.error('Failed to update todo due date');
	return {
		message: 'Failed to update todo due date',
		success: false,
	};
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
