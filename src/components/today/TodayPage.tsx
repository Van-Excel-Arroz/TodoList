import { getDueTodayTodos } from '@/lib/todo';
import FilteredTodosPage from '../ui-shared/FilteredTodosPage';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';

export default async function TodayPage() {
	const dueTodayTodosWithTodoList = await getDueTodayTodos();

	return (
		<>
			<FilteredTodosHeader title="Today" />

			{dueTodayTodosWithTodoList.length > 0 ? (
				<FilteredTodosPage filteredTodosWithTodoList={dueTodayTodosWithTodoList} />
			) : (
				<h1>It looks like you have no todos due today.</h1>
			)}
		</>
	);
}
