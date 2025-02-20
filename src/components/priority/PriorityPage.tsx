import { getImportantTodos } from '@/lib/todo';
import { Todo } from '@/utils/types';

export default async function PriorityPage() {
	const important_todos = await getImportantTodos();

	return (
		<div className="w-[98%] mx-auto">
			<p className="text-lg font-bold">Priority Page</p>
			{important_todos.map(important_todo => (
				<div key={important_todo.id} className="font-bold">
					<p>{important_todo.title}</p>
					{important_todo.importantTodos.map((todo: Todo) => (
						<p className="pl-5">{todo.task_text}</p>
					))}
				</div>
			))}
		</div>
	);
}
