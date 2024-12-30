import { Category, Todo } from '@/types';
import { query } from './db';

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

export async function getTodoWithCategories(todoId: number): Promise<Category[]> {
	try {
		const result = await query(
			`
			SELECT c.id, cc.category_title, cc.hex_color, cc.is_selected
			FROM categories c
			JOIN category_colors cc ON  c.category_color_id = cc.id
			WHERE c.todo_id = $1
			`,
			[todoId]
		);
		return result.rows;
	} catch (error) {
		console.error('Error fetching todo with categories in the database', error);
		return [];
	}
}

export async function getTodosWithCategories(todolistId: number): Promise<Todo[]> {
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
		console.error('Error fetching todo with categories in the database', error);
		return [];
	}
}

export async function getTodo(todoId: number): Promise<Todo | null> {
	try {
		const result = await query('SELECT * FROM todos WHERE id = $1', [todoId]);
		const todo = result.rows[0];
		const categories = await getTodoWithCategories(todo.id);
		return {
			...todo,
			categories,
		};
	} catch (error) {
		console.error('Error fetching todo in the database', error);
		return null;
	}
}

export async function getTodos(todolistId: number): Promise<Todo[]> {
	try {
		const result = await query('SELECT * FROM todos WHERE todo_list_id = $1', [todolistId]);
		const todos = result.rows;
		return todos;
	} catch (error) {
		console.error('Error fetching todos in the database');
		return [];
	}
}

export async function updateTodoCompletion(todoId: number, isCompleted: boolean): Promise<boolean> {
	try {
		await query(
			`
				UPDATE todos SET is_completed = $1 WHERE id = $2
			`,
			[isCompleted, todoId]
		);
		return true;
	} catch (error) {
		console.error('Error updating isCompleted in todo from the database', error);
		return false;
	}
}

export async function updateTodoImportance(todoId: number, isImportant: boolean): Promise<boolean> {
	try {
		await query(
			`
				UPDATE todos SET is_important = $1 WHERE id = $2
			`,
			[isImportant, todoId]
		);
		return true;
	} catch (error) {
		console.error('Error updating isImportant in todo from the database', error);
		return false;
	}
}

export async function deleteTodo(todoId: number): Promise<boolean> {
	try {
		await query('DELETE FROM todos WHERE id = $1', [todoId]);
		return true;
	} catch (error) {
		console.error('Error deleting todo in the database', error);
		return false;
	}
}

export async function updateTodoTitle(todoId: number, title: string): Promise<boolean> {
	try {
		await query('UPDATE todos SET task_text = $1 WHERE id = $2', [title, todoId]);
		return true;
	} catch (error) {
		console.error('Error updating todo title in the database', error);
		return false;
	}
}

export async function updateTodoDueDate(todoId: number, dueDate: string): Promise<boolean> {
	try {
		await query('UPDATE todos SET due_datetime = $1 WHERE id = $2', [dueDate, todoId]);
		return true;
	} catch (error) {
		console.error('Error updating todo due date in the database', error);
		return false;
	}
}

export async function deleteTodoDueDate(todoId: number): Promise<boolean> {
	try {
		await query('UPDATE todos SET due_datetime = null WHERE id = $1', [todoId]);
		return true;
	} catch (error) {
		console.error('Error deleting todo due date in the database', error);
		return false;
	}
}

export async function updateTodoDescription(todoId: number, description: string | null): Promise<boolean> {
	try {
		await query('UPDATE todos SET description = $1 WHERE id = $2', [description, todoId]);
		return true;
	} catch (error) {
		console.error('Error updating todo description in the database', error);
		return false;
	}
}
