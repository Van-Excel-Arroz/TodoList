import TodoListPage from '@/components/todo-list/TodoListPage';
import NoTodoListSelected from '@/components/ui-shared/NoTodoListSelected';

interface PageProps {
	searchParams: Promise<{
		id?: string;
	}>;
}

export default async function TasksPage({ searchParams }: PageProps) {
	const { id = '' } = await searchParams;
	const todolistId = Number(id);

	if (!id) {
		return <NoTodoListSelected />;
	}

	return <TodoListPage todolistId={todolistId} />;
}
