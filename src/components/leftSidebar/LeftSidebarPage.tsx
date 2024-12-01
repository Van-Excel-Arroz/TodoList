import { TodoList } from '@/types';
import { getTodolists } from '@/lib/todolist';
import SidebarWrapper from './SidebarWrapper';
import TodolistForm from './TodolistForm';
import TodolistsRender from './TodolistsRender';
import LeftSidebarHeader from './LeftSidebarHeader';

export default async function LeftSidebarPage() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<SidebarWrapper>
				<div className="flex flex-col gap-4 px-6">
					<LeftSidebarHeader />
					<TodolistForm />
				</div>
				<TodolistsRender todolists={todolists} />
			</SidebarWrapper>
		</>
	);
}
