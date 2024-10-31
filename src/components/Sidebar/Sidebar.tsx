import SidebarList from '@/components/Sidebar/SidebarList';
import { getTodolists } from '@/lib/todolist';
import { Suspense } from 'react';

interface TodoList {
	id: number;
	title: string;
}

export default async function Sidebar() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<SidebarList initialTodolist={todolists} />
		</Suspense>
	);
}
