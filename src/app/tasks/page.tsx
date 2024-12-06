import TodoListPage from '@/components/main/TodoListPage';
import NoTodoListSelected from '@/components/NoTodoListSelected';

export default async function TasksPage({ searchParams }: { searchParams: { id?: string } }) {
	if (!searchParams.id) {
		return <NoTodoListSelected />;
	}
	const todolistId = Number(searchParams.id);
	return <TodoListPage todolistId={todolistId} />;
}
