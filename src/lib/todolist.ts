import { query } from './db';

export async function storeTodolist(title: string, user_id: number) {
	try {
		const result = await query(
			`
			INSERT INTO todo_lists (title, user_id) VALUES ($1, $2) RETURNING id
			`,
			[title, user_id]
		);
		const todolistId = result.rows[0]?.id;
		return todolistId ?? null;
	} catch (error) {
		console.log('Error inserting todolist in the database');
		return null;
	}
}

export async function getTodolists(user_id: number) {
	try {
		const result = await query(
			`
			SELECT id, title FROM todo_lists WHERE user_id = $1 ORDER BY id
			`,
			[user_id]
		);
		return result.rows;
	} catch (error) {
		console.error('Error fetching todolists from the database');
		return;
	}
}

export async function getTodolist(todolistId: number, user_id: number) {
	try {
		const result = await query(
			`
			SELECT * FROM todo_lists WHERE id = $1 AND user_id = $2
			`,
			[todolistId, user_id]
		);
		return result.rows[0];
	} catch (error) {
		console.error('Error fetching todolist from the database');
		return;
	}
}

export async function deleteTodolist(todolistId: number, user_id: number) {
	try {
		await query(
			`
			DELETE FROM todo_lists WHERE id = $1 AND user_id = $2
			`,
			[todolistId, user_id]
		);
		return true;
	} catch (error) {
		console.log('Error deleting todolist from the database');
		return false;
	}
}

export async function updateTodolist(todolistId: number, title: string) {
	try {
		await query(
			`
			UPDATE todo_lists SET title = $1 WHERE id = $2
			`,
			[title, todolistId]
		);
		return true;
	} catch (error) {
		console.error('Error updating todolist from the database');
		return false;
	}
}

export async function getTodolistIds(): Promise<number[] | []> {
	try {
		const result = await query(
			`
				SELECT id FROM todo_lists
			`
		);
		return result.rows;
	} catch (error) {
		console.error('Error fetching todolist IDs in the database', error);
		return [];
	}
}
