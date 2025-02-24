import { getImportantTodos } from '@/lib/todo';
import PriorityMain from './component/PriorityMain';
import PriorityHeader from './component/PriorityHeader';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<div className="w-[98%] mx-auto">
			<PriorityHeader />
			<PriorityMain importantTodosWithTodoList={importantTodosWithTodoList} />
		</div>
	);
}
