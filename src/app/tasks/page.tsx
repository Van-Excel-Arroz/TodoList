import TodoListPage from '@/components/todos/TodoListPage';
import NoTodoListSelected from '@/components/NoTodoListSelected';
import { getTodolistIds } from '@/lib/todolist';

interface PageProps {
	searchParams: Promise<{
		id?: string;
	}>;
}

export default async function TasksPage({ searchParams }: PageProps) {
	const { id } = await searchParams; // Expecting id to be a string
	console.log('ID from searchParams:', id); // Debugging log

	const todolist_ids = await getTodolistIds();
	console.log('Todo List IDs:', todolist_ids); // Debugging log

	// Convert id to a number and check for existence
	const existingId = todolist_ids.find(todolistId => todolistId.id === Number(id));
	console.log('Existing ID:', existingId); // Debugging log

	if (id && existingId) {
		const todolistId = Number(id);
		return <TodoListPage todolistId={todolistId} />;
	} else {
		return <NoTodoListSelected />;
	}
}
