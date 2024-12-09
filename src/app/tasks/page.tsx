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
	const todolistId = Number(id);
	const todolist_ids = await getTodolistIds();
	const existingId = todolist_ids.find(existingId => existingId.id === todolistId);

	if (id && existingId) {
		return <TodoListPage todolistId={todolistId} />;
	} else {
		return <NoTodoListSelected />;
	}
}
