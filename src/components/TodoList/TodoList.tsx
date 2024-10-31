'use client';

import { useState, useTransition, useCallback, memo } from 'react';
import SidebarToggle from '../Sidebar/SidebarToggle';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import React from 'react';

interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

interface TodolistContentProps {
	todolistId: number;
	title: string;
	initialTodos: Todo[];
}

const MemoizedTodoForm = memo(TodoForm);
const MemoizedTodoItem = memo(TodoItem);
const MemoizedSidebarToggle = memo(SidebarToggle, (prevProps, nextProps) => {
	return true;
});

function TodoList({ todolistId, title, initialTodos }: TodolistContentProps) {
	const [todos, setTodos] = useState(initialTodos);
	const [isPending, startTransition] = useTransition();

	const handleAddTodo = useCallback((todo: Todo) => {
		startTransition(() => {
			setTodos(prevTodos => [...prevTodos, todo]);
		});
	}, []);

	return (
		<>
			<div className="flex flex-col px-6 p-9 ">
				<div className="flex gap-4">
					<MemoizedSidebarToggle />
					<p className="text-lg font-bold">
						{title} #{todolistId}
					</p>
				</div>
				<MemoizedTodoForm todolistId={todolistId} onAdd={handleAddTodo} />

				<div className="grid grid-cols-6 my-3 px-4 font-semibold">
					<p className="col-span-4">Todos</p>
					<p className="text-center">Due Date</p>
					<p className="text-center">Created In</p>
				</div>
				<div>
					{todos.map(todo => (
						<MemoizedTodoItem key={todo.id} todo={todo} />
					))}
				</div>
			</div>
		</>
	);
}

export default React.memo(TodoList);
