import TodoForm from './TodoForm';

import TodolistHeader from './TodolistHeader';
import TodosRender from './TodosRender';
import { Todo, TodoList } from '@/types';

interface TodolistContentProps {
	todolist: TodoList;
	todolistId: number;
	todos: Todo[];
}

export default function TodoListContent({ todolist, todolistId, todos }: TodolistContentProps) {
	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodolistHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} />
				<TodosRender todos={todos} />
			</div>
		</>
	);
}
