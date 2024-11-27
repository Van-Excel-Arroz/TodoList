import TodoListContent from '@/components/TodoList/TodoListContent';
import { getTodosWithCategories } from '@/lib/todo';
import { getTodolist } from '@/lib/todolist';
import { Suspense } from 'react';

export default async function Todolist({ params }: { params: any }) {
	const todolistId = Number(params.id);
	const todolist = await getTodolist(todolistId, 1);
	const todos = await getTodosWithCategories(todolistId);

	return (
		<Suspense fallback={<h1>Loading.....</h1>}>
			<TodoListContent todolist={todolist} todolistId={todolistId} todos={todos} />
		</Suspense>
	);
}
