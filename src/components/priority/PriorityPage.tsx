import { getImportantTodos } from '@/lib/todo';
import PrioritySection from './component/PrioritySection';
import { TodoListWithImportantTodos } from '@/utils/types';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<div className="w-[98%] mx-auto">
			<p className="text-lg font-bold">Priority Page</p>
			{importantTodosWithTodoList.map((todoList: TodoListWithImportantTodos) => (
				<PrioritySection todoList={todoList} />
			))}
		</div>
	);
}
