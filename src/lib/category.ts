'use server';

import { Category, CategoryTag } from '@/utils/types';
import { query } from './db';

export async function getCategoryColor(category: string, todolistId: number): Promise<Category | null> {
	try {
		const result = await query('SELECT * FROM category_colors WHERE category_title = $1 AND todo_list_id = $2', [
			category,
			todolistId,
		]);
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error fetching category and color in the database');
		return null;
	}
}

export async function createCategoryColor(category: string, color: string, todolistId: number): Promise<number | null> {
	try {
		const result = await query(
			'INSERT INTO category_colors (category_title, hex_color, todo_list_id) VALUES ($1, $2, $3) RETURNING id',
			[category, color, todolistId]
		);
		const newCategoryId = result.rows[0];
		return newCategoryId;
	} catch (error) {
		console.error('Error inserting category and colors in the database', error);
		return null;
	}
}

export async function storeCategoriesColors(categories: CategoryTag[], todolistId: number): Promise<number[]> {
	try {
		const categoryColorIds = [];

		for (const category of categories) {
			const existingCategory = await getCategoryColor(category.tagName, todolistId);
			if (existingCategory) {
				categoryColorIds.push(existingCategory.id);
				continue;
			}
			const newCategoryId = await createCategoryColor(category.tagName, category.color, todolistId);
			categoryColorIds.push(newCategoryId);
		}

		const validCategoryColorIds = categoryColorIds.filter((id): id is number => id !== undefined);

		return validCategoryColorIds;
	} catch (error) {
		console.error('Error storing categories and colors in the database', error);
		return [];
	}
}

export async function storeCategories(todoId: number, categoryColorsId: number[]) {
	try {
		for (let i = 0; i < categoryColorsId.length; i++) {
			await storeCategory(todoId, categoryColorsId[i]);
		}
	} catch (error) {
		console.error('Error inserting categories in the database', error);
	}
}

export async function storeCategory(todoId: number, categoryColorId: number): Promise<number | undefined> {
	try {
		const result = await query('INSERT INTO categories (todo_id, category_color_id) VALUES ($1, $2) RETURNING id', [
			todoId,
			categoryColorId,
		]);
		return result.rows[0].id;
	} catch (error) {
		console.error('Error inserting category in the database', error);
		return;
	}
}

export async function deleteCategory(categoryColorId: number, todoId: number): Promise<boolean> {
	try {
		await query('DELETE FROM categories WHERE category_color_id = $1 AND todo_id = $2', [categoryColorId, todoId]);
		return true;
	} catch (error) {
		console.error('Error deleting category in the database', error);
		return false;
	}
}

export async function getCategories(todolistId: number): Promise<Category[]> {
	try {
		const result = await query(`SELECT * FROM category_colors WHERE todo_list_id = ${todolistId}`);
		return result.rows;
	} catch (error) {
		console.error('Error fetching categories from the database.');
		return [];
	}
}
