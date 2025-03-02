import { getImportantTodos } from '@/lib/todo';
import FilteredTodosPage from '../ui-shared/FilteredTodosPage';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<>
			<FilteredTodosHeader title="Priority" />
			<FilteredTodosPage filteredTodosWithTodoList={importantTodosWithTodoList} />
		</>
	);
}
