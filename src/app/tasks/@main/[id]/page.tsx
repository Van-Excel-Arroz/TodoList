import TodoList from '@/components/TodoList/TodoList';
import { getTodos } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';

import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function TodolistPage({ params }: { params: any }) {
	const todolistId = Number(params.id);
	const todolist = (await getTodolist(todolistId, 1)) ?? {};
	const todos = await getTodos(todolistId);

	if (todolistId !== todolist.id) {
		return notFound();
	}

	if (!todolist || !todolist.id) {
		redirect('/tasks/home');
	}

	return (
		<Suspense fallback={<h1>Loading.....</h1>}>
			<TodoList todolistId={todolistId} title={todolist.title} initialTodos={todos} />
		</Suspense>
	);
}
