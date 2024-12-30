import { Suspense } from 'react';
import { getTodosWithCategories } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import TodoListHeader from './components/TodoListHeader';
import { redirect } from 'next/navigation';
import TodoListMain from './components/TodoListMain';

export default async function TodoListPage({ todolistId }: { todolistId: number }) {
	const todolist = await getTodolist(todolistId, 1);

	if (!todolist) {
		redirect('/tasks/');
	}

	const todos = await getTodosWithCategories(todolistId);

	return (
		<Suspense fallback={<LoadingAnimation />}>
			<div className="flex flex-col mb-24 relative">
				<TodoListHeader todolist={todolist} />
				<TodoListMain initialTodos={todos} />
			</div>
		</Suspense>
	);
}

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

const LoadingAnimation = () => (
	<div className="flex justify-center items-center h-screnn">
		<h1 className="text-2xl font-bold">Loading.....</h1>
	</div>
);
