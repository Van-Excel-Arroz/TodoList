import { getTodosByCategories } from '@/lib/todo';
import FilteredTodosHeader from '../ui-shared/FilteredTodosHeader';
import FilteredTodoListPage from '../ui-shared/FilteredTodoListPage';

export default async function TaggedPage() {
	const todosByCategories = await getTodosByCategories();

	return (
		<>
			<FilteredTodosHeader title="Tagged" />
			{todosByCategories.length > 0 ? (
				<FilteredTodoListPage filteredTodoList={todosByCategories} title="tagged" />
			) : (
				<h1 className="text-center pt-12 text-lg text-slate-700">It looks like you have no todos with categories.</h1>
			)}
		</>
	);
}
