import { Category, Todo, TodoListWithFilteredTodos } from '@/utils/types';
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

export async function getCategoriesFromTodo(todoId: number): Promise<Category[]> {
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

export async function getTodosWithCategories(todolistId: number, userId: number): Promise<Todo[]> {
	try {
		const result = await query(
			`
			SELECT
				t.id,
				t.task_text,
				t.description,
				t.is_important,
				t.due_datetime,
				t.creation_date,
				t.is_completed,
				t.order_index,
				json_agg(
						json_build_object(
								'id', c.id,
								'category_title', cc.category_title,
								'hex_color', cc.hex_color,
								'is_selected', cc.is_selected,
								'todo_list_id', cc.todo_list_id
						)
				) FILTER (WHERE c.id IS NOT NULL) as categories
				FROM todos t
				LEfT JOIN categories c ON c.todo_id = t.id
				LEfT JOIN todo_lists tl ON tl.id = t.todo_list_id
				LEfT JOIN category_colors cc ON cc.id = c.category_color_id
				WHERE tl.id = $1 AND tl.user_id = $2
				GROUP BY t.id
		`,
			[todolistId, userId]
		);
		const todosWithCategories = result.rows;
		return todosWithCategories;
	} catch (error) {
		console.error('Error fetching todo with categories in the database', error);
		return [];
	}
}

export async function getFilteredTodos(
	userId: number,
	filterBy: 'Due Date' | 'Importance'
): Promise<TodoListWithFilteredTodos[]> {
	const filterQuery = {
		'Due Date': 't.due_datetime IS NOT NULL',
		Importance: 't.is_important = TRUE',
	};

	try {
		const result = await query(
			`
			SELECT 
				tl.title,
				tl.id,
				json_agg(
						json_build_object(
								'id', t.id,
								'task_text', t.task_text,
								'description', t.description,
								'is_important', t.is_important,
								'due_datetime', t.due_datetime,
								'creation_date', t.creation_date,
								'is_completed', t.is_completed,
								'order_index', t.order_index,
								'todo_list_id', t.todo_list_id,
								'categories', (
										SELECT json_agg(
												json_build_object(
														'id', c.id,
														'category_title', cc.category_title,
														'hex_color', cc.hex_color,
														'is_selected', cc.is_selected,
														'todo_list_id', cc.todo_list_id
												)
										)
										FROM categories c
										JOIN category_colors cc ON c.category_color_id = cc.id
										WHERE c.todo_id = t.id
								)
						)
				) FILTER (WHERE t.is_completed = FALSE and ${filterQuery[filterBy]}) AS filtered_todos 
			FROM 
					todo_lists as tl
			JOIN 
					todos t ON tl.id = t.todo_list_id
			WHERE
					tl.user_id = $1
			GROUP BY 
					tl.title, tl.id
			ORDER BY 
					tl.id;
`,
			[userId]
		);
		const importantTodos = result.rows;
		return importantTodos;
	} catch (error) {
		console.error(`Error fetching all filtered todos by ${filterQuery[filterBy]} in the database.`);
		return [];
	}
}

export async function getTodosByCategories(): Promise<TodoListWithFilteredTodos[]> {
	try {
		const result = await query(`
			SELECT 
			cc.category_title AS title,
			cc.id,
			json_agg(
					json_build_object(
							'id', t.id,
							'task_text', t.task_text,
							'description', t.description,
							'is_important', t.is_important,
							'due_datetime', t.due_datetime,
							'creation_date', t.creation_date,
							'is_completed', t.is_completed,
							'order_index', t.order_index,
							'categories', (
									SELECT json_agg(
											json_build_object(
													'id', cat.id,
													'category_title', cat_col.category_title,
													'hex_color', cat_col.hex_color,
													'is_selected', cat_col.is_selected,
													'todo_list_id', cat_col.todo_list_id
											)
									)
									FROM categories cat
									JOIN category_colors cat_col ON cat.category_color_id = cat_col.id
									WHERE cat.todo_id = t.id
							)
					)
						) FILTER (WHERE t.is_completed = FALSE) AS filtered_todos
				FROM 
						category_colors cc
				JOIN 
						categories c ON cc.id = c.category_color_id
				JOIN 
						todos t ON c.todo_id = t.id
				JOIN
						todo_lists tl ON t.todo_list_id = tl.id
				WHERE
						tl.user_id = 1
				GROUP BY 
						cc.category_title, cc.id
				HAVING 
    				COUNT(CASE WHEN t.is_completed = FALSE THEN 1 END) > 0
				ORDER BY 
				cc.category_title;	
				`);

		const todosByCategories = result.rows;

		return todosByCategories;
	} catch (error) {
		console.error(`Error fetching all todos by categories:`, error);
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

export async function updateTodoCompletedAt(todoId: number, completedAt: string | null) {
	try {
		await query('UPDATE todos SET completed_at = $1 WHERE id = $2', [completedAt, todoId]);
		return true;
	} catch (error) {
		console.error('Error updating todo completedAt in the database', error);
		return false;
	}
}
