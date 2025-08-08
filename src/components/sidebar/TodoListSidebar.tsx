import { TodoList } from '@/utils/types';
import { getTodolists } from '@/lib/todolist';
import TodoListsSidebarWrapper from './components/TodoListsSidebarWrapper';
import TodoListsHeader from './components/TodoListsHeader';
import TodolistContainer from './components/TodolistContainer';
import NewTodolistButton from './components/NewTodolistButton';
import SmartTodolistContainer from './components/SmartTodolistContainer';
import Logout from './ui/Logout';

export default async function TodoListsSidebar({ userId }: { userId: number }) {
	const todolists: TodoList[] = (await getTodolists(userId)) as TodoList[];
	return (
		<>
			<TodoListsSidebarWrapper>
				<TodoListsHeader />
				<SmartTodolistContainer />
				<NewTodolistButton userId={userId} />
				<TodolistContainer initialTodoLists={todolists} />
				<Logout />
			</TodoListsSidebarWrapper>
		</>
	);
}
