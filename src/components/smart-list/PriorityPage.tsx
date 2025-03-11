import { getImportantTodos } from '@/lib/todo';
import FilteredTodosPage from '../ui-shared/FilteredTodoListPage';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<>
			<FilteredTodosHeader title="Priority" />
			{importantTodosWithTodoList.length > 0 ? (
				<FilteredTodosPage filteredTodos={importantTodosWithTodoList} />
			) : (
				<h1 className="text-center pt-12 text-lg text-slate-700">It looks like you have no important todos.</h1>
			)}
		</>
	);
}
