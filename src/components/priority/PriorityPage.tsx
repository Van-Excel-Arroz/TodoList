import { getImportantTodos } from '@/lib/todo';
import PriorityContainer from './component/PriorityContainer';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<div className="w-[98%] mx-auto">
			<p className="text-lg font-bold">Priority Page</p>
			<PriorityContainer importantTodosWithTodoList={importantTodosWithTodoList} />
		</div>
	);
}
