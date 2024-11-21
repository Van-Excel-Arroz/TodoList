export interface Todo {
	id: number;
	task_text: string;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
	categories: Category[];
	is_completed: boolean;
}

export interface TodoList {
	id: number;
	title: string;
}

export interface Category {
	id: number;
	category_title: string;
	hex_color: string;
}
