'use server';

import { storeTodo } from '@/lib/todo';
import { deleteTodolist, storeTodolist, updateTodolist } from '@/lib/todolist';
import { revalidatePath } from 'next/cache';

export async function createTodolist(title: string) {
	const todolistId = await storeTodolist(title, 1);
	if (todolistId) {
		revalidatePath(`/tasks/${todolistId}`);
	}

	return todolistId;
}

export async function createTodo(text: string, dueDatetime: string | null, todolistId: number) {
	const todoId = await storeTodo(text, dueDatetime, todolistId);
	if (todoId) {
		revalidatePath(`/tasks/${todolistId}`);
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
