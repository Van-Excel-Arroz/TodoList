import { TodoList } from '@/types';
import { getTodolists } from '@/lib/todolist';
import TodolistsRender from './TodolistsRender';
import TodoListSidebarWrapper from './TodoListSidebarWrapper';
import TodoListSidebarHeader from './TodoListSidebarHeader';
import TodolistSidebarForm from './TodolistSidebarForm';

export default async function TodoListSidebar() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<TodoListSidebarWrapper>
				<div className="flex flex-col gap-4 px-6">
					<TodoListSidebarHeader />
					<TodolistSidebarForm />
				</div>
				<TodolistsRender todolists={todolists} />
			</TodoListSidebarWrapper>
		</>
	);
}
