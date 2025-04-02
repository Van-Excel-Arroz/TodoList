export interface Todo {
	id: number;
	order_index: number;
	task_text: string;
	due_datetime: string | null;
	description: string | null;
	completed_at: string | null;
	is_important: boolean;
	is_completed: boolean;
	creation_date: string;
	todo_list_id: number;
	categories: Category[] | null;
}

export interface Category {
	id: number;
	category_title: string;
	hex_color: string;
	is_selected: boolean;
	todo_list_id: number;
}

export interface CategoryTag {
	tagName: string;
	color: string;
}

export interface TodoList {
	id: number;
	title: string;
}

export interface MenuOpenProps {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
}

export interface TodoListWithFilteredTodos extends TodoList {
	filtered_todos: Todo[];
}
