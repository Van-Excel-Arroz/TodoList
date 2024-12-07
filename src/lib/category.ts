import { Category } from '@/types';
import { query } from './db';
import { PREDEFINED_COLORS } from '@/utils/constants';

async function getCategoryColor(category: string, todolistId: number): Promise<Category | null> {
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

export async function createCategoryColor(
	category: string,
	color: string,
	todolistId: number
): Promise<number | undefined> {
	try {
		const existingCategoryTitle = await query('SELECT * FROM category_colors WHERE category_title = $1', [category]);
		if (existingCategoryTitle.rows.length > 0) {
			await query('UPDATE category_colors SET hex_color = $1 WHERE category_title = $2 ', [color, category]);
			return existingCategoryTitle.rows[0].id;
		} else {
			const result = await query(
				'INSERT INTO category_colors (category_title, hex_color, is_selected, todo_list_id) VALUES ($1, $2, FALSE, $3) RETURNING id',
				[category, color, todolistId]
			);
			return result.rows[0].id;
		}
	} catch (error) {
		console.error('Error inserting category and colors in the database', error);
		return;
	}
}

async function getNextColor(): Promise<string | null> {
	try {
		// First, try to find an unused color
		const result = await query(
			`
			SELECT color.hex_color
			FROM (
				SELECT unnest($1::text[]) as hex_color
			) AS color
			WHERE NOT EXISTS (
				SELECT 1 FROM category_colors cc 
				WHERE cc.hex_color = color.hex_color
			)
			LIMIT 1
		`,
			[PREDEFINED_COLORS]
		);

		// If we found an unused color, use it
		if (result.rows.length > 0) {
			return result.rows[0].hex_color;
		}

		// If all colors are used, find the least recently used color
		const leastUsedResult = await query(`
			SELECT cc.hex_color, COUNT(*) as usage_count
			FROM category_colors cc
			GROUP BY cc.hex_color
			ORDER BY usage_count ASC, cc.hex_color
			LIMIT 1
		`);

		return leastUsedResult.rows[0].hex_color;
	} catch (error) {
		console.error('Error checking and getting the next color in the database');
		return null;
	}
}

export async function storeCategoriesColors(categories: string[], todolistId: number) {
	try {
		const categoryIds = [];

		for (const category of categories) {
			const existingCategory = await getCategoryColor(category, todolistId);
			if (existingCategory) {
				categoryIds.push(existingCategory.id);
				continue;
			}

			const color = await getNextColor();
			if (!color) continue;
			const newCategoryId = await createCategoryColor(category, color, todolistId);
			categoryIds.push(newCategoryId);
		}

		return categoryIds;
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
		const existingCategory = await query('SELECT * FROM categories WHERE todo_id = $1 AND category_color_id = $2', [
			todoId,
			categoryColorId,
		]);

		if (existingCategory.rows.length > 0) return;

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

export async function updateIsSelectedCategoryColors(categoryTitle: string, isSelected: boolean): Promise<boolean> {
	try {
		await query('UPDATE category_colors SET is_selected = $1 WHERE category_title = $2', [isSelected, categoryTitle]);
		return true;
	} catch (error) {
		console.error('Error updating isSelected in category_colors from the database', error);
		return false;
	}
}

export async function getSelectedCategories(todolistId: number): Promise<Category[]> {
	try {
		const result = await query('SELECT * FROM category_colors WHERE is_selected = TRUE AND todo_list_id = $1', [
			todolistId,
		]);
		return result.rows;
	} catch (error) {
		console.error('Error fetching selected categories in the database', error);
		return [];
	}
}

export async function deleteCategory(categoryId: number): Promise<boolean> {
	try {
		await query('DELETE FROM categories WHERE id = $1', [categoryId]);
		return true;
	} catch (error) {
		console.error('Error deleting category in the database', error);
		return false;
	}
}
