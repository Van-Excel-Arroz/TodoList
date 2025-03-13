'use client';

import Button from '@/components/ui-shared/Button';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { Menu, PanelLeftClose } from 'lucide-react';

export default function TodoListsSidebarToggle() {
	const { toggleTodoListsSidebar, isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	return (
		<Button onClick={toggleTodoListsSidebar} ariaLabel="Todolist Menu">
			{isTodoListsSidebarOpen ? <PanelLeftClose size={25} /> : <Menu className="text-slate-800" size={20} />}
		</Button>
	);
}
