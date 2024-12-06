'use client';

import useLeftSidebarStore from '@/context/LeftSidebarContext';
import { ArrowBigLeftDashIcon, Menu } from 'lucide-react';

export default function TodoListSidebarToggle() {
	const { toggleLeftSidebar, isLeftSidebarOpen } = useLeftSidebarStore();
	return (
		<button onClick={toggleLeftSidebar} aria-label="Todolist Menu">
			{isLeftSidebarOpen ? <ArrowBigLeftDashIcon /> : <Menu />}
		</button>
	);
}
