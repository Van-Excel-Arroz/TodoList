import { getImportantTodos } from '@/lib/todo';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';
import FilteredTodoListPage from '../ui-shared/FilteredTodoListPage';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos(1);

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
