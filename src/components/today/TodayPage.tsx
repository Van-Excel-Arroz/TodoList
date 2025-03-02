import { getDueTodayTodos } from '@/lib/todo';
import FilteredTodosPage from '../ui-shared/FilteredTodosPage';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';

export default async function TodayPage() {
	const dueTodayTodosWithTodoList = await getDueTodayTodos();

	return (
		<>
			<FilteredTodosHeader title="Today" />
			<FilteredTodosPage filteredTodosWithTodoList={dueTodayTodosWithTodoList} />
		</>
	);
}
