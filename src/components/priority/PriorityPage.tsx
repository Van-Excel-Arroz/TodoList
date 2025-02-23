import { getImportantTodos } from '@/lib/todo';
import PriorityMain from './component/PriorityMain';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<div className="w-[98%] mx-auto">
			<p className="text-lg font-bold p-2">Priority Page</p>
			<PriorityMain importantTodosWithTodoList={importantTodosWithTodoList} />
		</div>
	);
}
