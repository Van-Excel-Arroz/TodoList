'use client';

import { Todo } from '@/types';
import TodosSection from './TodosSection';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const incompletedTodos: Todo[] = [];
	const completedTodos: Todo[] = [];

	for (const todo of todos) {
		if (todo.is_completed) {
			completedTodos.push(todo);
		} else {
			incompletedTodos.push(todo);
		}
	}

	return (
		<>
			{todos.length > 0 ? (
				<div>
					<TodosSection title="Todos" todos={incompletedTodos} />
					<TodosSection title="Completed Todos" todos={completedTodos} />
				</div>
			) : (
				<div className="flex flex-col items-center justify-center text-gray-600 mt-10">
					<p className="text-lg">No todos found</p>
					<p className="text-sm">Create a new todo to get started</p>
				</div>
			)}
		</>
	);
}
