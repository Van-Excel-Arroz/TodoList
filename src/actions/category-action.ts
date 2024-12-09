'use server';

import { createCategoryColor, deleteCategory, storeCategory, updateIsSelectedCategoryColors } from '@/lib/category';
import { revalidatePath } from 'next/cache';

export async function addTodoCategoryAction(
	categoryTitle: string,
	hexColor: string,
	todolistId: number,
	todoId: number
): Promise<number | undefined> {
	const categoryColorsId = await createCategoryColor(categoryTitle, hexColor, todolistId);
	const categoryId = await storeCategory(todoId, categoryColorsId!);
	console.log(categoryId);

	if (categoryId) {
		revalidatePath(`/tasks/${todolistId}`);
		return categoryId;
	} else {
		console.error('Failed to add category to todo');
		return;
	}
}

export async function deleteTodoCategoryAction(categoryId: number, todolistId: number) {
	const result = await deleteCategory(categoryId);

	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to delete category from todo');
	}
}

export async function updateIsSelectedCategoryColorsAction(
	categoryColorId: number,
	isSelected: boolean,
	todolistId: number
) {
	const result = await updateIsSelectedCategoryColors(categoryColorId, isSelected);
	if (result) {
		revalidatePath(`/tasks/${todolistId}`);
	} else {
		console.error('Failed to update is_selected in category_colors');
	}
}
