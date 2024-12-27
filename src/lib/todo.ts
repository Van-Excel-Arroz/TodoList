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

export async function sortTodosBySelectedCategory(selectedCategories: Category[], todolistId: number): Promise<Todo[]> {
	const extractedCategories = selectedCategories.map(category => category.category_title);

	try {
		const result = await query(
			`
      SELECT
        t.id AS id,
        t.task_text,
        t.due_datetime,
        t.creation_date,
        t.todo_list_id,
        t.is_completed,
				t.description,
				t.important
      FROM
        todos t
      LEFT JOIN
        categories c ON t.id = c.todo_id
      LEFT JOIN
        category_colors cc ON c.category_color_id = cc.id
      WHERE t.todo_list_id = $2
      GROUP BY
        t.id
      ORDER BY
        -- First order by number of matching categories (descending)
        COUNT(CASE WHEN cc.category_title = ANY($1) THEN 1 END) DESC,
        -- Then by total number of categories (ascending) for ties
        COUNT(c.category_color_id) ASC,
        -- Finally by creation date
        t.creation_date ASC
      `,
			[extractedCategories, todolistId]
		);

		const todosWithCategories: Todo[] = await Promise.all(
			result.rows.map(async todo => {
				const categories = await getTodoWithCategories(todo.id);
				return {
					...todo,
					categories,
				};
			})
		);
		return todosWithCategories;
	} catch (error) {
		console.error('Error sorting todos by selected category in the database', error);
		return [];
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
