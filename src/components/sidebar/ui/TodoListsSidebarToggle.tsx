'use client';

import Button from '@/components/ui-shared/Button';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { PanelLeft } from 'lucide-react';

export default function TodoListsSidebarToggle() {
	const { toggleTodoListsSidebar } = useTodoListsSidebarStore();
	return (
		<Button onClick={toggleTodoListsSidebar} ariaLabel="Todolist Menu">
			<PanelLeft />
		</Button>
	);
}
