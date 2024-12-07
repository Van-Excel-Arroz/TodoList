'use server';

import { storeCategories, storeCategoriesColors } from '@/lib/category';
import { storeTodo } from '@/lib/todo';
import { revalidatePath } from 'next/cache';

export async function createTodoAction(
	taskText: string,
	dueDatetime: string | null,
	todolistId: number,
	categories: string[]
) {
	const todoId: number = await storeTodo(taskText, dueDatetime, todolistId);
	const categoryColorsId = await storeCategoriesColors(categories, todolistId);
	const validCategoryIds = categoryColorsId.filter((id): id is number => id !== undefined);
	await storeCategories(todoId, validCategoryIds);

	if (todoId) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to create the todo');
		return null;
	}
}
