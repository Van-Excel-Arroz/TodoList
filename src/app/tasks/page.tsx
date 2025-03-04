import PriorityPage from '@/components/smart-list/PriorityPage';
import UpcomingTodayPage from '@/components/smart-list/UpcomingPage';
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

	switch (smartList) {
		case 'priority':
			return <PriorityPage />;
		case 'upcoming':
			return <UpcomingTodayPage />;
	}

	if (todolistId === null || isNaN(todolistId)) {
		return <NoTodoListSelected />;
	}

	return <TodoListPage todolistId={todolistId} />;
}
