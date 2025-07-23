'use server';

import { deleteTodolist, storeTodolist, updateTodolist } from '@/lib/todolist';
import { ActionState } from '@/utils/types';

export async function createTodolist(title: string): Promise<ActionState<number | null>> {
	const todolistId = await storeTodolist(title, 1);
	await new Promise(resolve => setTimeout(resolve, 1500));
	if (todolistId) {
		return {
			message: 'Todo list created successfully',
			success: true,
			data: todolistId,
		};
	} else {
		console.error('Failed to add the todo list');
		return {
			message: 'Failed to add the todo list',
			success: false,
			data: null,
		};
	}
}

export async function deleteTodolistAction(todolistId: number): Promise<ActionState<void>> {
	const result = await deleteTodolist(todolistId);
	await new Promise(resolve => setTimeout(resolve, 1500));
	if (result) {
		return {
			message: 'Todo list deleted successfully',
			success: true,
		};
	} else {
		console.error('Failed to delete the todo list');
		return {
			message: 'Failed to delete the todo list',
			success: false,
		};
	}
}

export async function updateTodolistAction(todolistId: number, title: string) {
	const result = await updateTodolist(todolistId, title);
	if (result) {
		return {
			message: 'Todo list updated successfully',
			success: true,
		};
	} else {
		console.error('Failed to update the todo list');
		return {
			message: 'Failed to update the todo list',
			success: false,
		};
	}
}
