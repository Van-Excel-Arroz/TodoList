'use client';

import { Todo } from '@/types';
import TodoSection from './TodoSection';
import useTodosStore from '@/context/TodosContext';
import { useEffect } from 'react';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const { initialTodos, setTodos } = useTodosStore();
	useEffect(() => {
		setTodos(todos);
	}, [todos, setTodos]);

	const incompletedTodos: Todo[] = [];
	const completedTodos: Todo[] = [];

	for (const todo of initialTodos) {
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
