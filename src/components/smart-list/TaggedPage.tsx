import { getTodosByCategories } from '@/lib/todo';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';
import FilteredTodosPage from '../ui-shared/FilteredTodosPage';

export default async function TaggedPage() {
	const todosByCategories = await getTodosByCategories();

	return (
		<>
			<FilteredTodosHeader title="Tagged" />
			<FilteredTodosPage filteredTodosWithTodoList={todosByCategories} />
		</>
	);
}
