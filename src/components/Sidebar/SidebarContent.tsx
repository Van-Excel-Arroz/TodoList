import TodolistForm from './TodolistForm';
import { TodoList } from '@/types';
import SidebarHeader from './SidebarHeader';
import TodolistsRender from './TodolistsRender';

interface SidebarContentProps {
	todolists: TodoList[];
}

export default function SidebarContent({ todolists }: SidebarContentProps) {
	return (
		<>
			<div className="flex flex-col gap-4 px-6">
				<SidebarHeader />
				<TodolistForm />
			</div>
			<TodolistsRender todolists={todolists} />
		</>
	);
}
