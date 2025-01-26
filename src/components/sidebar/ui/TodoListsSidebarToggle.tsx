'use client';

import { Button } from '@/components/ui-shared/Button';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { ArrowBigLeftDashIcon, Menu } from 'lucide-react';

export default function TodoListsSidebarToggle() {
	const { toggleTodoListsSidebar, isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	return (
		<Button onClick={toggleTodoListsSidebar} ariaLabel="Todolist Menu">
			{isTodoListsSidebarOpen ? <ArrowBigLeftDashIcon size={30} /> : <Menu size={22} />}
		</Button>
	);
}
