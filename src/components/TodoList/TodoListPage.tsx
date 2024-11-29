import { getSelectedCategories, getTodosWithCategories, sortTodosBySelectedCategory } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import { Todo } from '@/types';
import { Suspense } from 'react';
import TodoListContainer from './TodoListContainer';

export default async function TodoListPage({ params }: { params: any }) {
	const todolistId = Number(params.id);
	const todolist = await getTodolist(todolistId, 1);
	const selectedCategories = await getSelectedCategories(todolistId);
	let todos: Todo[];

	if (selectedCategories.length > 0) {
		todos = await sortTodosBySelectedCategory(selectedCategories, todolistId);
	} else {
		todos = await getTodosWithCategories(todolistId);
	}

	return (
		<Suspense fallback={<h1>Loading.....</h1>}>
			<TodoListContainer
				todolist={todolist}
				todolistId={todolistId}
				todos={todos}
				selectedCategories={selectedCategories}
			/>
		</Suspense>
	);
}
