'use client';

import { useState, useCallback, memo } from 'react';
import SidebarToggle from '../Sidebar/SidebarToggle';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import React from 'react';
import useSidebarStore from '../Context/SidebarContext';

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

function TodoListContent({ todolistId, title, initialTodos }: TodolistContentProps) {
	const [todos, setTodos] = useState(initialTodos);
	const { isSidebarOpen } = useSidebarStore();

	const handleAddTodo = useCallback((todo: Todo) => {
		setTodos(prevTodos => [...prevTodos, todo]);
	}, []);

	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<div className="flex gap-4">
					{!isSidebarOpen && <SidebarToggle />}
					<p className="text-lg font-bold">
						{title} #{todolistId}
					</p>
				</div>
				<TodoForm todolistId={todolistId} onAdd={handleAddTodo} />

				<div className="grid grid-cols-6 my-3 px-4 font-semibold">
					<p className="col-span-4">Todos</p>
					<p className="text-center">Due Date</p>
					<p className="text-center">Created In</p>
				</div>
				<div>
					{todos.map(todo => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</div>
			</div>
		</>
	);
}

export default memo(TodoListContent);
