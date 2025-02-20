import { getImportantTodos } from '@/lib/todo';

export default async function PriorityPage() {
	const important_todos = await getImportantTodos();
	console.log(important_todos);

	return (
		<div className="w-[98%] mx-auto">
			<p className="text-lg font-bold">Priority Page</p>
			{important_todos.map(important_todo => (
				<p key={important_todo.id}>{important_todo.todolist_title}</p>
			))}
		</div>
	);
}
