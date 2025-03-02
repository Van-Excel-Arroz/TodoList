import { getImportantTodos } from '@/lib/todo';
import PriorityHeader from './component/PriorityHeader';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<div>
			<PriorityHeader />
		</div>
	);
}
