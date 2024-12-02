export interface Todo {
	id: number;
	task_text: string;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
	categories: Category[] | null;
	is_completed: boolean;
}

export interface Category {
	id: number;
	category_title: string;
	hex_color: string;
	is_selected: boolean;
	todo_list_id: number;
}

export interface TodoList {
	id: number;
	title: string;
}
