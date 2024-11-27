'use client';

import { Category, Todo } from '@/types';
import TodosSection from './TodosSection';
import { Span } from 'next/dist/trace';

interface TodosRenderProps {
	todos: Todo[];
	selectedCategories: Category[];
}

export default function TodosRender({ todos, selectedCategories }: TodosRenderProps) {
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
			{selectedCategories.length > 0 ? (
				<div>
					{selectedCategories.map(selectedCategory => (
						<p key={selectedCategory.id}>{selectedCategory.category_title}</p>
					))}
				</div>
			) : null}
			{todos.length > 0 ? (
				<div>
					<TodosSection title="Todos" todos={incompletedTodos} />
					<TodosSection title="Completed Todos" todos={completedTodos} />
				</div>
			) : (
				<div className="flex flex-col items-center justify-center text-gray-600">
					<p className="text-lg">No todos found</p>
					<p className="text-sm">Create a new todo to get started</p>
				</div>
			)}
		</>
	);
}
