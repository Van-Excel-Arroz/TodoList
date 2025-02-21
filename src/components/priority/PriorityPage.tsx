import { getImportantTodos } from '@/lib/todo';

export default async function PriorityPage() {
	const importantTodos = await getImportantTodos();

	return (
		<div className="w-[98%] mx-auto">
			<p className="text-lg font-bold">Priority Page</p>
		</div>
	);
}
