import TodolistForm from './TodolistForm';
import { TodoList } from '@/types';
import SidebarHeader from './SidebarHeader';
import TodolistsRender from './TodolistsRender';

interface SidebarContentProps {
	todolists: TodoList[];
	onAddTodolist: (todolist: TodoList) => void;
}

export default function SidebarContent({ todolists, onAddTodolist }: SidebarContentProps) {
	return (
		<>
			<div className="flex flex-col gap-4 px-6">
				<SidebarHeader />
				<TodolistForm onAdd={onAddTodolist} />
			</div>
			<TodolistsRender todolists={todolists} />
		</>
	);
}
