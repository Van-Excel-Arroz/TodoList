import { query } from './db';

interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

export async function storeTodo(text: string, dueDatetime: string | null, todolistId: number) {
	const dueDatetimeValue = typeof dueDatetime === 'string' ? dueDatetime.trim() : null;

	const result = await query(
		'INSERT INTO todos (task_text, due_datetime, todo_list_id) VALUES ($1, $2, $3) RETURNING id',
		[text, dueDatetimeValue, todolistId]
	);
	return result?.rows[0].id;
}

export async function getTodos(todolistId: number) {
	const result = await query('SELECT * FROM todos WHERE todo_list_id = $1', [todolistId]);
	const todos: Todo[] = result.rows;
	return todos;
}
