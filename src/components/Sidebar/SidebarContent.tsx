import TodolistForm from './TodolistForm';
import { memo } from 'react';
import { TodoList } from '@/types';
import SidebarHeader from './SidebarHeader';
import TodolistsRender from './TodolistsRender';

interface SidebarContentProps {
	todolists: TodoList[];
	onAddTodolist: (todolist: TodoList) => void;
}

function SidebarContent({ todolists, onAddTodolist }: SidebarContentProps) {
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
//sidebar
export default memo(SidebarContent);
