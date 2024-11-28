import CategoriesRender from './CategoriesRender';
import TodoForm from './TodoForm';
import TodolistHeader from './TodolistHeader';
import TodosRender from './TodosRender';
import { Category, Todo, TodoList } from '@/types';

interface TodolistContentProps {
	todolist: TodoList;
	todolistId: number;
	todos: Todo[];
	selectedCategories: Category[];
}

export default function TodoListContent({ todolist, todolistId, todos, selectedCategories }: TodolistContentProps) {
	console.log(todos);
	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodolistHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} />
				<CategoriesRender selectedCategories={selectedCategories} todoListId={todolistId} />
				<TodosRender todos={todos} />
			</div>
		</>
	);
}
