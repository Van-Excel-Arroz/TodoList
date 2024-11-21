import { Todo } from '@/types';
import { query } from './db';
import { PREDEFINED_COLORS } from '@/utils/constants';

export async function storeTodo(text: string, dueDatetime: string | null, todolistId: number) {
	try {
		const dueDatetimeValue = typeof dueDatetime === 'string' ? dueDatetime.trim() : null;

		const result = await query(
			'INSERT INTO todos (task_text, due_datetime, todo_list_id, is_completed) VALUES ($1, $2, $3, FALSE) RETURNING id',
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
		console.error('Error fetching category and color in the database');
		return;
	}
}

async function createCategoryColor(category: string, color: string) {
	try {
		const result = await query('INSERT INTO category_colors (category_title, hex_color) VALUES ($1, $2) RETURNING id', [
			category,
			color,
		]);
		return result.rows[0].id;
	} catch (error) {
		console.error('Error inserting category and colors in the database');
	}
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
		console.error('Error storing categories and colors in the database');
		return [];
	}
}

export async function storeCategories(todoId: number, categoryColorsId: number[]) {
	try {
		for (let i = 0; i < categoryColorsId.length; i++) {
			await query('INSERT INTO categories (todo_id, category_color_id) VALUES ($1, $2)', [todoId, categoryColorsId[i]]);
		}
	} catch (error) {
		console.error('Error inserting categories in the database');
	}
}

export async function getTodoWithCategories(todoId: number) {
	try {
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
	} catch (error) {
		console.error('Error fetching todo with categories in the database');
		return;
	}
}

export async function getTodosWithCategories(todolistId: number) {
	try {
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
	} catch (error) {
		console.error('Error fetching todo with categories in the database');
		return [];
	}
}

export async function getTodos(todolistId: number) {
	try {
		const result = await query('SELECT * FROM todos WHERE todo_list_id = $1', [todolistId]);
		const todos = result.rows;
		return todos;
	} catch (error) {
		console.error('Error fetching todos in the database');
		return [];
	}
}

export async function updateTodoCompletion(todoId: number, isCompleted: boolean) {
	try {
		await query(
			`
				UPDATE todo SET is_completed = $1 WHERE id = $2
			`,
			[isCompleted, todoId]
		);
		return true;
	} catch (error) {
		console.error('Error updating isCompleted in todo from the database');
		return false;
	}
}
