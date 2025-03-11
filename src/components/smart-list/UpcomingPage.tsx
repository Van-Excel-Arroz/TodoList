import { getTodosWithDueDate } from '@/lib/todo';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';
import FilteredTodoListPage from '../ui-shared/FilteredTodoListPage';

export default async function UpcomingTodayPage() {
	const todosWithDue = await getTodosWithDueDate();

	return (
		<>
			<FilteredTodosHeader title="Upcoming" />
			{todosWithDue.length > 0 ? (
				<FilteredTodoListPage filteredTodoList={todosWithDue} />
			) : (
				<h1 className="text-center pt-12 text-lg text-slate-700">It looks like you have no todos with due date.</h1>
			)}
		</>
	);
}
