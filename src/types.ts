export interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

export interface TodoList {
	id: number;
	title: string;
}
