import CategoryList from './CategoryList';
import TodoForm from './TodoForm';
import TodoListHeader from './TodolistHeader';

import TodosRender from './TodosRender';
import { Category, Todo, TodoList } from '@/types';

interface TodolistContentProps {
	todolist: TodoList;
	todolistId: number;
	todos: Todo[];
	selectedCategories: Category[];
}

export default function TodoListContainer({ todolist, todolistId, todos, selectedCategories }: TodolistContentProps) {
	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodoListHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} />
				<CategoryList selectedCategories={selectedCategories} todoListId={todolistId} />
				<TodosRender todos={todos} />
			</div>
		</>
	);
}
