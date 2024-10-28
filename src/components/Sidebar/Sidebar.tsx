import { getTodolists } from '@/lib/todolist';
import SidebarList from './SidebarList';

interface TodoList {
	id: number;
	title: string;
}

export default async function Sidebar() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];

	return <SidebarList initialTodolist={todolists} />;
}
