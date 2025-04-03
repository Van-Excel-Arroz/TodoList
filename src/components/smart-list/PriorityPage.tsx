import { getFilteredTodos } from '@/lib/todo';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';
import FilteredTodoListPage from '../ui-shared/FilteredTodoListPage';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getFilteredTodos(1, 'Importance');

	return (
		<>
			<FilteredTodosHeader title="Priority" />
			{importantTodosWithTodoList.length > 0 ? (
				<FilteredTodoListPage filteredTodoList={importantTodosWithTodoList} />
			) : (
				<h1 className="text-center pt-12 text-lg text-slate-700">It looks like you have no important todos.</h1>
			)}
		</>
	);
}
