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

const predefinedColors = [
	'#9e0142',
	'#d53e4f',
	'#f46d43',
	'#fdae61',
	'#fee08b',
	'#e6f598',
	'#abdda4',
	'#66c2a5',
	'#3288bd',
	'#5e4fa2',
];

export async function storeTodo(text: string, dueDatetime: string | null, todolistId: number) {
	const dueDatetimeValue = typeof dueDatetime === 'string' ? dueDatetime.trim() : null;

	const result = await query(
		'INSERT INTO todos (task_text, due_datetime, todo_list_id) VALUES ($1, $2, $3) RETURNING id',
		[text, dueDatetimeValue, todolistId]
	);
	return result?.rows[0].id;
}

export async function storeCategoriesColors(categories: Category[]) {
	const categoryColorsId: number[] = [];
	const colorMap: Map<string, string> = new Map();

	for (let category of categories) {
		let result = await query('SELECT id FROM category_colors WHERE category_title = $1', [category]);
		let category_color_id: number;
		let color: string;

		if (result.rows.length > 0) {
			category_color_id = result.rows[0].id;
		} else {
			color = predefinedColors[colorMap.size % predefinedColors.length];
			const insertResult = await query(
				'INSERT INTO category_colors (category_title, hex_color) VALUES ($1, $2) RETURNING id',
				[category.title, color]
			);
			category_color_id = insertResult.rows[0].id;

			colorMap.set(category.title, color);
		}
		categoryColorsId.push(category_color_id);
	}
	return categoryColorsId;
}

export async function storeCategories(todoId: number, categoryColorsId: number[]) {
	for (let i = 0; i < categoryColorsId.length; i++) {
		await query('INSERT INTO categories (todo_id, category_color_id) VALUES ($1, $2)', [todoId, categoryColorsId[i]]);
	}
}

export async function getTodos(todolistId: number) {
	const result = await query('SELECT * FROM todos WHERE todo_list_id = $1', [todolistId]);
	const todos: Todo[] = result.rows;
	return todos;
}
