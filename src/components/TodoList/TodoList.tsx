import TodoListContent from '@/components/TodoList/TodoListContent';
import { getSelectedCategories, getTodosWithCategories, sortTodosBySelectedCategory } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import { Todo } from '@/types';
import { Suspense } from 'react';

export default async function Todolist({ params }: { params: any }) {
	const todolistId = Number(params.id);
	const todolist = await getTodolist(todolistId, 1);
	const selectedCategories = await getSelectedCategories();
	let todos: Todo[];

	if (selectedCategories.length > 0) {
		todos = await sortTodosBySelectedCategory(selectedCategories, todolistId);
	} else {
		todos = await getTodosWithCategories(todolistId);
	}

	return (
		<Suspense fallback={<h1>Loading.....</h1>}>
			<TodoListContent
				todolist={todolist}
				todolistId={todolistId}
				todos={todos}
				selectedCategories={selectedCategories}
			/>
		</Suspense>
	);
}
