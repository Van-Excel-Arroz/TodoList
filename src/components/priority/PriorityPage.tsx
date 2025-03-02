import { getImportantTodos } from '@/lib/todo';

export default async function PriorityPage() {
	const importantTodosWithTodoList = await getImportantTodos();

	return (
		<h1>Hello World</h1>
	);
}
