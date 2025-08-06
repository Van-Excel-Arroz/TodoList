import { Suspense } from 'react';
import { getTodosWithCategories } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import TodoListHeader from './components/TodoListHeader';
import { redirect } from 'next/navigation';
import TodoListMain from './components/TodoListMain';
import { getCategories } from '@/lib/category';

export default async function TodoListPage({ todolistId, userId }: { todolistId: number; userId: number }) {
	const todolist = await getTodolist(todolistId, userId);
	const categories = await getCategories(todolistId);

	if (!todolist) {
		redirect('/tasks/');
	}

	const todos = await getTodosWithCategories(todolistId, userId);
	return (
		<Suspense fallback={<LoadingAnimation />}>
			<TodoListHeader initialTodolist={todolist} categories={categories} />
			<TodoListMain initialTodos={todos} />
		</Suspense>
	);
}

const LoadingAnimation = () => (
	<div className="flex justify-center items-center h-screnn">
		<h1 className="text-2xl font-bold">Loading.....</h1>
	</div>
);
