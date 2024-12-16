import { TodoList } from '@/types';
import { getTodolists } from '@/lib/todolist';
import TodolistItems from './content/TodoListItems';
import TodolistForm from './content/TodolistForm';
import TodoListsSidebarWrapper from './content/TodoListsSidebarWrapper';
import TodoListsHeader from './content/TodoListsHeader';

export default async function TodoListsSidebar() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<TodoListsSidebarWrapper>
				<div className="flex flex-col gap-4 px-6">
					<TodoListsHeader />
					<TodolistForm />
				</div>
				<TodolistItems initialTodoLists={todolists} />
			</TodoListsSidebarWrapper>
		</>
	);
}
