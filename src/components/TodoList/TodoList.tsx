import TodoListContent from '@/components/TodoList/TodoListContent';
import { getTodosWithCategories } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Todolist({ params }: { params: any }) {
	const todolistId = Number(params.id);
	const todolist = (await getTodolist(todolistId, 1)) ?? {};
	const todosWithCategories = await getTodosWithCategories(todolistId);

	if (todolistId !== todolist.id) {
		return notFound();
	}

	return (
		<Suspense fallback={<h1>Loading.....</h1>}>
			<TodoListContent todolist={todolist} todolistId={todolistId} todos={todosWithCategories} />
		</Suspense>
	);
}
