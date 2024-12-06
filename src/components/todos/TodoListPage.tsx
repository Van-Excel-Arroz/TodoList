import { Suspense } from 'react';
import { getSelectedCategories, getTodosWithCategories, sortTodosBySelectedCategory } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import { Todo } from '@/types';
import TodoForm from './TodoForm';
import CategoryList from './CategoryList';
import TodoListView from './TodoListView';
import TodoListHeader from './TodoListHeader';

export default async function TodoListPage({ todolistId }: { todolistId: number }) {
	const todolist = await getTodolist(todolistId, 1);
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
				<CategoryList selectedCategories={selectedCategories} todoListId={todolistId} />
				<TodoListView todos={todos} />
			</div>
		</Suspense>
	);
}

const LoadingAnimation = () => (
	<div className="flex justify-center items-center h-screnn">
		<h1 className="text-2xl font-bold">Loading.....</h1>
	</div>
);
