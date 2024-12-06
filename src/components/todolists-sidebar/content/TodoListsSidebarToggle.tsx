'use client';

import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { ArrowBigLeftDashIcon, Menu } from 'lucide-react';

export default function TodoListsSidebarToggle() {
	const { toggleTodoListsSidebar, isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	return (
		<button onClick={toggleTodoListsSidebar} aria-label="Todolist Menu">
			{isTodoListsSidebarOpen ? <ArrowBigLeftDashIcon /> : <Menu />}
		</button>
	);
}
