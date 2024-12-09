import TodoListPage from '@/components/todos/TodoListPage';
import NoTodoListSelected from '@/components/NoTodoListSelected';
import { getTodolistIds } from '@/lib/todolist';

interface PageProps {
	searchParams: Promise<{
		id?: string;
	}>;
}

export default async function TasksPage({ searchParams }: PageProps) {
	const { id } = await searchParams;
	const todolist_ids = await getTodolistIds();
	const existingId = todolist_ids.find(todolistId => todolistId.id === Number(id));
	console.log('Existing ID:', existingId);

	if (id && existingId) {
		const todolistId = Number(id);
		return <TodoListPage todolistId={todolistId} />;
	} else {
		return <NoTodoListSelected />;
	}
}
