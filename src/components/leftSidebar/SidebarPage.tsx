import { TodoList } from '@/types';
import SidebarWrapper from './SidebarWrapper';
import SidebarHeader from './SidebarHeader';
import TodolistForm from './TodolistForm';
import TodolistsRender from './TodolistsRender';
import { getTodolists } from '@/lib/todolist';

export default async function SidebarPage() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<SidebarWrapper>
				<div className="flex flex-col gap-4 px-6">
					<SidebarHeader />
					<TodolistForm />
				</div>
				<TodolistsRender todolists={todolists} />
			</SidebarWrapper>
		</>
	);
}
