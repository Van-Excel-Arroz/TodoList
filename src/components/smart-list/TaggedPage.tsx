import { getTodosByCategories } from '@/lib/todo';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';
import FilteredTodoListPage from '../ui-shared/FilteredTodoListPage';

export default async function TaggedPage() {
	const todosByCategories = await getTodosByCategories();

	return (
		<>
			<FilteredTodosHeader title="Tagged" />
			<FilteredTodoListPage filteredTodoList={todosByCategories} title="tagged" />
		</>
	);
}
