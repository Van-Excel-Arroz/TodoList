export interface Todo {
	id: number;
	task_text: string;
	categories: Category[];
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

export interface TodoList {
	id: number;
	title: string;
}

export interface Category {
	category_title: string;
	hex_color: string;
}
