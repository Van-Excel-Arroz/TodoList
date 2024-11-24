'use client';

import { Todo } from '@/types';
import TodosSection from './TodosSection';
import { memo } from 'react';

interface TodosRenderProps {
	todos: Todo[];
}

function TodosRender({ todos }: TodosRenderProps) {
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
				<p className="text-center">No Todos Available.</p>
			)}
		</>
	);
}

export default memo(TodosRender);
