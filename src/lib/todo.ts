import { Todo } from '@/types';
import { query } from './db';
import { PREDEFINED_COLORS } from '@/utils/constants';

export async function storeTodo(text: string, dueDatetime: string | null, todolistId: number) {
	const dueDatetimeValue = typeof dueDatetime === 'string' ? dueDatetime.trim() : null;

	const result = await query(
		'INSERT INTO todos (task_text, due_datetime, todo_list_id) VALUES ($1, $2, $3) RETURNING id',
		[text, dueDatetimeValue, todolistId]
	);
	return result?.rows[0].id;
}

async function getCategoryColor(category: string) {
	const result = await query('SELECT * FROM category_colors WHERE category_title = $1', [category]);
	return result.rows[0] || null;
}

async function createCategoryColor(category: string, color: string) {
	const result = await query('INSER INTO category_colors (category_title, hex_color) VALUES ($1, $2)', [
		category,
		color,
	]);
	return result.rows[0].id;
}

export async function storeCategoriesColors(categories: string[]) {
	const categoryColorsMap = new Map<string, number>();
	const colorAssignments = new Map<string, string>();
	let colorIndex = 0;

	const categoryIds = await Promise.all(
		categories.map(async category => {
			// Check if we've already processed this category in current batch
			if (categoryColorsMap.has(category)) {
				return categoryColorsMap.get(category)!;
			}

			// Check if category already exists in database
			const existingCategory = await getCategoryColor(category);
			if (existingCategory) {
				categoryColorsMap.set(category, existingCategory.id);
				return existingCategory.id;
			}

			// Assign new color and create category
			const color = PREDEFINED_COLORS[colorIndex % PREDEFINED_COLORS.length];
			colorIndex++;

			const newCategoryId = await createCategoryColor(category, color);
			categoryColorsMap.set(category, newCategoryId);
			colorAssignments.set(category, color);

			return newCategoryId;
		})
	);

	return categoryIds;
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
