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
	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodolistHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} />
				<TodosRender todos={todos} selectedCategories={selectedCategories} />
			</div>
		</>
	);
}
