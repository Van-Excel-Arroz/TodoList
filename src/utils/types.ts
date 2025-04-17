export interface Todo {
	id: number;
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

export interface SortFilterMenuProps extends MenuOpenProps {
	width?: string;
	top?: string;
	header?: boolean;
	clearBtn?: boolean;
}

export interface TodoListWithFilteredTodos extends TodoList {
	filtered_todos: Todo[];
}

export interface BehaviorSettings {
	filterField: string | null;
	filterValue: string | null;
	sortField: string | null;
	sortOrder: 'asc' | 'desc';
	completedTasks: string;
	newTasksPosition: string;
	dueDateFormat: string;
}

export interface AppearanceSettings {
	accent: string;
	listIcon: string;
	layout: string;
}

export interface SettingsToSave extends AppearanceSettings {
	completedTasks: string;
	newTasksPosition: string;
	dueDateFormat: string;
}

export interface SingleSelectionProps {
	selectedOption: string | null;
	onOptionSelect: (option: string | null) => void;
}
