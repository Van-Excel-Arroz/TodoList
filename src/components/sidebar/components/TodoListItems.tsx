'use client';

import { TodoList } from '@/types';
import TodoListItem from './TodoListItem';
import { useEffect } from 'react';
import useTodoListsStore from '@/context/TodoListsContext';
import { List } from 'lucide-react';

export default function TodolistItems({ initialTodoLists }: { initialTodoLists: TodoList[] }) {
	const { todolists, setTodolists } = useTodoListsStore();
	useEffect(() => {
		if (todolists.length === 0) {
			setTodolists(initialTodoLists);
		}
	}, [initialTodoLists, setTodolists, todolists]);
	const isEmpty = todolists.length === 0;

	return (
		<div className="h-[calc(100%-90px)] flex flex-col w-full overflow-y-auto overflow-hidden">
			{isEmpty ? (
				<div className="text-center mt-4">
					<p className="text-xl font-semibold mb-2">No Tasks Available</p>
					<p className="text-gray-600">Start by adding a new todolist!</p>
				</div>
			) : (
				<>
					<div className="flex items-center gap-2 mb-2 w-10/12 mx-auto">
						<List size={30} className="text-slate-600" />
						<p>Lists</p> <hr className="border border-slate-200 w-full" />
					</div>
					<ul>
						{todolists.map(todolist => (
							<li key={todolist.id}>
								<TodoListItem todolist={todolist} />
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
