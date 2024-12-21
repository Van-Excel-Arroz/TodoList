import TodoListPage from '@/components/todo-list/TodoListPage';
import NoTodoListSelected from '@/components/ui/NoTodoListSelected';

interface PageProps {
	searchParams: Promise<{
		id?: string;
	}>;
}

export default async function TasksPage({ searchParams }: PageProps) {
	const { id = '' } = await searchParams;

	if (!id) {
		return <NoTodoListSelected />;
	}

	const todolistId = Number(id);
	return <TodoListPage todolistId={todolistId} />;
}
