'use server';

import { storeTodo } from '@/lib/todo';
import { deleteTodolist, storeTodolist } from '@/lib/todolist';
import { revalidatePath } from 'next/cache';

export async function createTodolist(title: string) {
	const todolistId = await storeTodolist(title, 1);
	revalidatePath(`/tasks/home`);

	if (todolistId) {
		revalidatePath(`/tasks/${todolistId}`);
	}

	return todolistId;
}

export async function createTodo(text: string, category: string, dueDatetime: string | null, todolistId: number) {
	const result = await storeTodo(text, category, dueDatetime, todolistId);
	revalidatePath(`/tasks/${todolistId}`);
	return result;
}

export async function deleteTodolistAction(todolistId: number, user_id: number) {
	const result = await deleteTodolist(todolistId, user_id);
	if (!result) {
		console.error('Failed to delete the todolist');
	}
}
