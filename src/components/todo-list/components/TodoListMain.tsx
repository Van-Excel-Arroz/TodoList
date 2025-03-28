'use client';

import { Todo } from '@/utils/types';
import TodoListView from './TodoListView';
import useTodosStore from '@/context/TodosContext';
import { useEffect } from 'react';

export default function TodoListMain({ initialTodos }: { initialTodos: Todo[] }) {
	const { todos, setTodos } = useTodosStore();

	useEffect(() => {
		setTodos(initialTodos);
	}, [initialTodos, setTodos]);

	return (
		<div className="w-[98%] h-[calc(100vh-80px)] mt-2 mx-auto overflow-y-scroll">
			{todos.length > 0 ? (
				<>
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
