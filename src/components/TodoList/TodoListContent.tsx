'use client';

import TodoForm from './TodoForm';
import React, { memo, useEffect, useState } from 'react';
import TodolistHeader from './TodolistHeader';
import TodosRender from './TodosRender';
import { Todo, TodoList } from '@/types';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface TodolistContentProps {
	todolist: TodoList;
	todolistId: number;
	initialTodos: Todo[];
}

function TodoListContent({ todolist, todolistId, initialTodos }: TodolistContentProps) {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);
	const pathname = usePathname();
	const router = useRouter();

	const addTodo = (newTodo: Todo) => {
		setTodos(prevTodos => [...prevTodos, newTodo]);
	};

	const updateCompletion = (todoId: number, isCompleted: boolean) => {
		setTodos(prevTodos => prevTodos.map(todo => (todo.id === todoId ? { ...todo, is_completed: isCompleted } : todo)));
		sessionStorage.setItem('needsRevalidation', pathname);
	};

	useEffect(() => {
		const revalidatePathNeeded = sessionStorage.getItem('needsRevalidation');

		if (revalidatePathNeeded === pathname) {
			router.refresh();
			sessionStorage.removeItem('needsRevalidation');
		}
	}, [pathname]);

	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodolistHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} onAddTodo={addTodo} />
				<TodosRender todos={todos} onUpdateCompletion={updateCompletion} />
			</div>
		</>
	);
}

export default memo(TodoListContent);
