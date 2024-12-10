'use client';

import { Todo } from '@/types';
import TodoSection from './TodoSection';

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
		<div>
			<TodoSection title="Todos" todos={incompletedTodos} />
			<TodoSection title="Completed Todos" todos={completedTodos} />
		</div>
	);
}
