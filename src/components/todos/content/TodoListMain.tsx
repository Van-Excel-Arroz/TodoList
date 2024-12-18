'use client';

import { Category, Todo } from '@/types';
import TodoFilter from './TodoFilter';
import TodoListView from './TodoListView';
import useTodosStore from '@/context/TodosContext';
import { useEffect } from 'react';

interface TodoListMainProps {
	selectedCategories: Category[];
	todolistId: number;
	initialTodos: Todo[];
}

export default function TodoListMain({ selectedCategories, todolistId, initialTodos }: TodoListMainProps) {
	const { todos, setTodos } = useTodosStore();
	useEffect(() => {
		setTodos(initialTodos);
	}, [initialTodos, setTodos]);

	return (
		<div className="w-[95%] mx-auto">
			{todos.length > 0 ? (
				<>
					<TodoFilter selectedCategories={selectedCategories} todoListId={todolistId} />
					<TodoListView todos={todos} />
				</>
			) : (
				<NoTodos />
			)}
		</div>
	);
}

const NoTodos = () => {
	return (
		<div className="flex flex-col items-center justify-center text-gray-600 mt-10">
			<p className="text-lg">No todos found</p>
			<p className="text-sm">Create a new todo to get started</p>
		</div>
	);
};
