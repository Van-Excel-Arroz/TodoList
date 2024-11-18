import { TodoList } from '@/types';
import SidebarWrapper from './SidebarWrapper';
import SidebarHeader from './SidebarHeader';
import TodolistForm from './TodolistForm';
import TodolistsRender from './TodolistsRender';

interface SidebarListProps {
	todolists: TodoList[];
}

export default function Sidebar({ todolists }: SidebarListProps) {
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
