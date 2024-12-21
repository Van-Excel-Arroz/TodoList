import { TodoList } from '@/types';
import { getTodolists } from '@/lib/todolist';
import TodolistForm from './components/TodolistForm';
import TodoListsSidebarWrapper from './components/TodoListsSidebarWrapper';
import TodoListsHeader from './components/TodoListsHeader';
import TodolistItems from './components/TodoListItems';

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
