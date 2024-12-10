import { Suspense } from 'react';
import { getTodosWithCategories, sortTodosBySelectedCategory } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import { Todo } from '@/types';
import TodoForm from './content/TodoForm';
import TodoListView from './content/TodoListView';
import TodoListHeader from './content/TodoListHeader';
import SelectedCategories from './content/SelectedCategories';
import { getSelectedCategories } from '@/lib/category';
import { redirect } from 'next/navigation';

export default async function TodoListPage({ todolistId }: { todolistId: number }) {
	const todolist = await getTodolist(todolistId, 1);

	if (!todolist) {
		redirect('/tasks/');
	}

	const selectedCategories = await getSelectedCategories(todolistId);
	let todos: Todo[];

	if (selectedCategories.length > 0) {
		todos = await sortTodosBySelectedCategory(selectedCategories, todolistId);
	} else {
		todos = await getTodosWithCategories(todolistId);
	}

	return (
		<Suspense fallback={<LoadingAnimation />}>
			<div className="font-body flex flex-col px-6 p-9">
				<TodoListHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} />
				{todos.length > 0 ? (
					<>
						<SelectedCategories selectedCategories={selectedCategories} todoListId={todolistId} />
						<TodoListView todos={todos} />
					</>
				) : (
					<div className="flex flex-col items-center justify-center text-gray-600 mt-10">
						<p className="text-lg">No todos found</p>
						<p className="text-sm">Create a new todo to get started</p>
					</div>
				)}
			</div>
		</Suspense>
	);
}

const LoadingAnimation = () => (
	<div className="flex justify-center items-center h-screnn">
		<h1 className="text-2xl font-bold">Loading.....</h1>
	</div>
);
