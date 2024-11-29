import Sidebar from '@/components/Sidebar/Sidebar';
import { getTodolists } from '@/lib/todolist';
import { TodoList } from '@/types';

export default async function LeftLayout() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<Sidebar todolists={todolists} />
		</>
	);
}
