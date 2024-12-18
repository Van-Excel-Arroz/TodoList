import { Suspense } from 'react';
import { getTodosWithCategories, sortTodosBySelectedCategory } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import TodoListHeader from './content/TodoListHeader';
import { getSelectedCategories } from '@/lib/category';
import { redirect } from 'next/navigation';
import TodoListMain from './content/TodoListMain';

export default async function TodoListPage({ todolistId }: { todolistId: number }) {
	const todolist = await getTodolist(todolistId, 1);

	if (!todolist) {
		redirect('/tasks/');
	}

	const selectedCategories = await getSelectedCategories(todolistId);
	const todos =
		selectedCategories.length > 0
			? await sortTodosBySelectedCategory(selectedCategories, todolistId)
			: await getTodosWithCategories(todolistId);

	return (
		<Suspense fallback={<LoadingAnimation />}>
			<div className="flex flex-col px-6 mb-24 relative">
				<TodoListHeader todolist={todolist} selectedCategories={selectedCategories} />
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
