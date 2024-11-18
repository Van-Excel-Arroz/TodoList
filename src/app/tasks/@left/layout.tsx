import SidebarList from '@/components/Sidebar/SidebarList';
import { getTodolists } from '@/lib/todolist';
import { TodoList } from '@/types';

export default async function LeftLayout() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<SidebarList todolists={todolists} />
		</>
	);
}
