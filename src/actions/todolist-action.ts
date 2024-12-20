'use server';

import { deleteTodolist, storeTodolist, updateTodolist } from '@/lib/todolist';

export async function createTodolist(title: string) {
	const todolistId = await storeTodolist(title, 1);
	if (todolistId) {
		return todolistId;
	} else {
		console.error('Failed to add the todolist');
		return;
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
