import { query } from './db';

interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

interface Category {
	title: string;
	hex_color: string;
}

export async function storeTodo(text: string, dueDatetime: string | null, todolistId: number) {
	const dueDatetimeValue = typeof dueDatetime === 'string' ? dueDatetime.trim() : null;

	const result = await query(
		'INSERT INTO todos (task_text, due_datetime, todo_list_id) VALUES ($1, $2, $3) RETURNING id',
		[text, dueDatetimeValue, todolistId]
	);
	return result?.rows[0].id;
}

export async function storeCategories(categories: Category[]) {
	const categoryIds: number[] = [];

	for (let category of categories) {
		let result = await query('SELECT id FROM category_colors WHERE category_title = $1', [category]);
		let category_color_id: number;
		if (result.rows.length > 0) {
			category_color_id = result.rows[0].id;
		} else {
			const insertResult = await query(
				'INSERT INTO category_colors (category_title, hex_color) VALUES ($1, $2) RETURNING id',
				[category.title, category.hex_color]
			);
			category_color_id = insertResult.rows[0].id;
		}
		categoryIds.push(category_color_id);
	}
	return categoryIds;
}

export async function getTodos(todolistId: number) {
	const result = await query('SELECT * FROM todos WHERE todo_list_id = $1', [todolistId]);
	const todos: Todo[] = result.rows;
	return todos;
}
