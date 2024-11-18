import { Todo } from '@/types';
import { query } from './db';
import { PREDEFINED_COLORS } from '@/utils/constants';

export async function storeTodo(text: string, dueDatetime: string | null, todolistId: number) {
	try {
		const dueDatetimeValue = typeof dueDatetime === 'string' ? dueDatetime.trim() : null;

		const result = await query(
			'INSERT INTO todos (task_text, due_datetime, todo_list_id) VALUES ($1, $2, $3) RETURNING id',
			[text, dueDatetimeValue, todolistId]
		);
		return result?.rows[0].id;
	} catch (error) {
		console.error('Error inserting todo in the database');
		return;
	}
}

async function getNextColor() {
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
		return;
	}
}

async function getCategoryColor(category: string) {
	try {
		const result = await query('SELECT * FROM category_colors WHERE category_title = $1', [category]);
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error fetching category and color from the database');
		return;
	}
}

async function createCategoryColor(category: string, color: string) {
	const result = await query('INSERT INTO category_colors (category_title, hex_color) VALUES ($1, $2) RETURNING id', [
		category,
		color,
	]);
	return result.rows[0].id;
}

export async function storeCategoriesColors(categories: string[]) {
	try {
		const categoryIds = [];

		for (const category of categories) {
			const existingCategory = await getCategoryColor(category);
			if (existingCategory) {
				categoryIds.push(existingCategory.id);
				continue;
			}

			const color = await getNextColor();
			const newCategoryId = await createCategoryColor(category, color);
			categoryIds.push(newCategoryId);
		}

		return categoryIds;
	} catch (error) {
		console.error('Error storing categories and colors');
		return;
	}
}

export async function storeCategories(todoId: number, categoryColorsId: number[]) {
	for (let i = 0; i < categoryColorsId.length; i++) {
		await query('INSERT INTO categories (todo_id, category_color_id) VALUES ($1, $2)', [todoId, categoryColorsId[i]]);
	}
}

export async function getTodoWithCategories(todoId: number) {
	const result = await query(
		`
		SELECT c.id, cc.category_title, cc.hex_color
		FROM categories c
		JOIN category_colors cc ON  c.category_color_id = cc.id
		WHERE c.todo_id = $1
		`,
		[todoId]
	);
	return result.rows;
}

export async function getTodosWithCategories(todolistId: number) {
	const todos = await getTodos(todolistId);

	const todosWithCategories: Todo[] = await Promise.all(
		todos.map(async todo => {
			const categories = await getTodoWithCategories(todo.id);
			return {
				...todo,
				categories,
			};
		})
	);
	return todosWithCategories;
}

export async function getTodos(todolistId: number) {
	const result = await query('SELECT * FROM todos WHERE todo_list_id = $1', [todolistId]);
	const todos = result.rows;
	return todos;
}
