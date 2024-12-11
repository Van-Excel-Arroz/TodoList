'use client';

import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { ArrowBigLeftDashIcon, List } from 'lucide-react';

export default function TodoListsSidebarToggle() {
	const { toggleTodoListsSidebar, isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	return (
		<button onClick={toggleTodoListsSidebar} aria-label="Todolist Menu">
			{isTodoListsSidebarOpen ? <ArrowBigLeftDashIcon /> : <List />}
		</button>
	);
}
