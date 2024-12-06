import { TodoList } from '@/types';
import { getTodolists } from '@/lib/todolist';
import TodoListSidebarWrapper from './content/TodoListSidebarWrapper';
import TodolistItems from './content/TodoListItems';
import TodolistForm from './content/TodolistForm';
import TodoListHeader from './content/TodoListHeader';

export default async function TodoListSidebar() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<TodoListSidebarWrapper>
				<div className="flex flex-col gap-4 px-6">
					<TodoListHeader />
					<TodolistForm />
				</div>
				<TodolistItems todolists={todolists} />
			</TodoListSidebarWrapper>
		</>
	);
}
