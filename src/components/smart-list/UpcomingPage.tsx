import { getTodosWithDueDate } from '@/lib/todo';
import FilteredTodosPage from '../ui-shared/FilteredTodosPage';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';

export default async function UpcomingTodayPage() {
	const todosWithDue = await getTodosWithDueDate();

	return (
		<>
			<FilteredTodosHeader title="Upcoming" />

			{todosWithDue.length > 0 ? (
				<FilteredTodosPage filteredTodosWithTodoList={todosWithDue} />
			) : (
				<h1 className="text-center pt-10 text-lg text-slate-700">It looks like you have no todos with due date.</h1>
			)}
		</>
	);
}
