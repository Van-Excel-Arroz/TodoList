import { TodoList } from '@/utils/types';
import { getTodolists } from '@/lib/todolist';
import TodoListsSidebarWrapper from './components/TodoListsSidebarWrapper';
import TodoListsHeader from './components/TodoListsHeader';
import TodolistContainer from './components/TodolistContainer';
import NewTodolistButton from './components/NewTodolistButton';
import SmartTodolistContainer from './components/SmartTodolistContainer';

export default async function TodoListsNav() {
	const todolists: TodoList[] = (await getTodolists(1)) ?? [];
	return (
		<>
			<TodoListsSidebarWrapper>
				<div className="flex flex-col w-full">
					<TodoListsHeader />
					<SmartTodolistContainer />
					<TodolistContainer initialTodoLists={todolists} />
				</div>
				<NewTodolistButton />
			</TodoListsSidebarWrapper>
		</>
	);
}
