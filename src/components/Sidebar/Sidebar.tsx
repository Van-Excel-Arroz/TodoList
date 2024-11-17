import SidebarList from '@/components/Sidebar/SidebarList';
import { getTodolists } from '@/lib/todolist';
import { TodoList } from '@/types';
import { Suspense } from 'react';

export default async function Sidebar() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<SidebarList todolists={todolists} />
		</Suspense>
	);
}
