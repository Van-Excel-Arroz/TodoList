import PriorityPage from '@/components/priority/PriorityPage';
import TodayPage from '@/components/today/TodayPage';
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
		case 'today':
			return <TodayPage/>
	}

	if (todolistId === null || isNaN(todolistId)) {
		return <NoTodoListSelected />;
	}

	return <TodoListPage todolistId={todolistId} />;
}
