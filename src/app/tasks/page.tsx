import TodoListPage from '@/components/todo-list/TodoListPage';
import NoTodoListSelected from '@/components/ui-shared/NoTodoListSelected';

interface PageProps {
	searchParams: Promise<{
		id?: string;
		'smart-list'?: string;
	}>;
}

export default async function TasksPage({ searchParams }: PageProps) {
	const { id = '', 'smart-list': smartList = '' } = await searchParams;
	const todolistId = id ? Number(id) : null;

	if (smartList in ['priority', 'today', 'upcoming', 'tagged']) {
		return <h1>{smartList.toUpperCase()}</h1>;
	}

	if (todolistId === null || isNaN(todolistId)) {
		return <NoTodoListSelected />;
	}

	return <TodoListPage todolistId={todolistId} />;
}
