import { getTodosWithDueDate } from '@/lib/todo';
import FilteredTodosPage from '../ui-shared/FilteredTodoListPage';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';

export default async function UpcomingTodayPage() {
	const todosWithDue = await getTodosWithDueDate();

	return (
		<>
			<FilteredTodosHeader title="Upcoming" />

			{todosWithDue.length > 0 ? (
				<FilteredTodosPage filteredTodos={todosWithDue} />
			) : (
				<h1 className="text-center pt-12 text-lg text-slate-700">It looks like you have no todos with due date.</h1>
			)}
		</>
	);
}
