'use server';

import { deleteTodolist, storeTodolist, updateTodolist } from '@/lib/todolist';
import { ActionState } from '@/utils/types';

export async function createTodolist(title: string): Promise<ActionState<number | null>> {
	const todolistId = await storeTodolist(title, 1);
	await new Promise(resolve => setTimeout(resolve, 1500));
	if (todolistId) {
		return {
			message: 'Todolist created successfully',
			success: true,
			data: todolistId,
		};
	} else {
		console.error('Failed to add the todolist');
		return {
			message: 'Failed to add the todolist',
			success: false,
			data: null,
		};
	}
}

export async function deleteTodolistAction(todolistId: number) {
	const result = await deleteTodolist(todolistId);
	if (!result) console.error('Failed to delete the todolist');
}

export async function updateTodolistAction(todolistId: number, title: string) {
	const result = await updateTodolist(todolistId, title);
	if (!result) console.error('Failed to update the todolist');
}
