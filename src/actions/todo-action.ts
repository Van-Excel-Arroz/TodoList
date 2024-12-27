'use server';

import { getCategoryColor, storeCategories, storeCategoriesColors } from '@/lib/category';
import {
	deleteTodo,
	deleteTodoDueDate,
	storeTodo,
	updateTodoCompletion,
	updateTodoDescription,
	updateTodoDueDate,
	updateTodoImportance,
	updateTodoTitle,
} from '@/lib/todo';
import { Category } from '@/types';

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

	const categoriesWithDetails = await Promise.all(
		categories.map(async title => {
			const category = await getCategoryColor(title, todolistId);
			return category
				? {
						id: category.id,
						category_title: category.category_title,
						hex_color: category.hex_color,
						is_selected: false,
						todo_list_id: todolistId,
				  }
				: null;
		})
	);
	const validCategories = categoriesWithDetails.filter(Boolean) as Category[];

	if (todoId) {
		return { validCategories, todoId };
	} else {
		console.error('Failed to create the todo');
		return null;
	}
}

export async function updateTodoCompletionAction(todoId: number, isCompleted: boolean) {
	const result = await updateTodoCompletion(todoId, isCompleted);
	if (!result) console.error('Failed to update is_completed in todo');
}

export async function updateTodoImportanceAction(todoId: number, isImportant: boolean) {
	const result = await updateTodoImportance(todoId, isImportant);
	if (!result) console.error('Failed to update is_important in todo');
}

export async function deleteTodoAction(todoId: number) {
	const result = await deleteTodo(todoId);
	if (!result) console.error('Failed to delete todo');
}

export async function updateTodoTitleAction(todoId: number, title: string) {
	const result = await updateTodoTitle(todoId, title);
	if (!result) console.error('Failed to update todo title');
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
