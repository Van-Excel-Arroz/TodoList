import SidebarList from '@/components/Sidebar/SidebarList';
import { getTodolists } from '@/lib/todolist';

interface TodoList {
	id: number;
	title: string;
}

export default async function LeftPage() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return <SidebarList initialTodolist={todolists} />;
}
