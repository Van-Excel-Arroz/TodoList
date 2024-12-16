'use client';

import { TodoList } from '@/types';
import TodoListItem from './TodoListItem';
import { useEffect } from 'react';
import useTodoListsStore from '@/context/TodoListsContext';

export default function TodolistItems({ initialTodoLists }: { initialTodoLists: TodoList[] }) {
	const { todolists, setTodolists } = useTodoListsStore();
	useEffect(() => {
		if (todolists.length === 0) {
			setTodolists(initialTodoLists);
		}
	}, [initialTodoLists, setTodolists, todolists]);
	const isEmpty = todolists.length === 0;

	return (
		<div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
			{isEmpty ? (
				<div className="text-center mt-4">
					<p className="text-xl font-semibold mb-2">No Tasks Available</p>
					<p className="text-gray-600">Start by adding a new todolist!</p>
				</div>
			) : (
				<ul className=" flex flex-col mb-4">
					{todolists.map(todolist => (
						<li key={todolist.id}>
							<TodoListItem key={todolist.id} todolist={todolist} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
