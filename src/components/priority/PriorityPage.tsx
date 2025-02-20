import { getImportantTodos } from '@/lib/todo';

export default async function PriorityPage() {
	const important_todos = await getImportantTodos();

	return (
		<div className="w-[98%] mx-auto">
			<p className="text-lg font-bold">Priority Page</p>
			{important_todos.map(important_todo => (
				<p key={important_todo.id}>{important_todo.todlist_title}</p>
			))}
		</div>
	);
}
