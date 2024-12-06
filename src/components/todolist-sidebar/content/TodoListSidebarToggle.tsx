'use client';

import useTodoListSidebarStore from '@/context/TodoListSidebarContext';
import { ArrowBigLeftDashIcon, Menu } from 'lucide-react';

export default function TodoListSidebarToggle() {
	const { toggleTodoListSidebar, isTodoListSidebarOpen } = useTodoListSidebarStore();
	return (
		<button onClick={toggleTodoListSidebar} aria-label="Todolist Menu">
			{isTodoListSidebarOpen ? <ArrowBigLeftDashIcon /> : <Menu />}
		</button>
	);
}
