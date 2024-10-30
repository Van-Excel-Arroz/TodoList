'use server';

import { storeTodo } from '@/lib/todo';
import { storeTodolist } from '@/lib/todolist';
import { revalidatePath } from 'next/cache';

export async function createTodolist(title: string) {
	if (title.trim().length <= 100) {
		const todolistId = await storeTodolist(title, 1);

		revalidatePath(`/tasks/home`);

		if (todolistId) {
			revalidatePath(`/tasks/${todolistId}`);
		}

		return todolistId;
	} else {
		console.error('Title is missing or is not a string.');
		return null;
	}
}

export async function createTodo(text: string, category: string, dueDatetime: string | null, todolistId: number) {
	const result = await storeTodo(text, category, dueDatetime, todolistId);
	revalidatePath(`/tasks/${todolistId}`);
	return result;
}
