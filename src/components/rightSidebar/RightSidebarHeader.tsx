'use client';

import useRightSidebarStore from '@/context/RightSidebarContext';
import useTodoStore from '@/context/todoContext';
import { ArrowBigRightDashIcon } from 'lucide-react';

export default function RightSidebarHeader() {
	const { closeRightSidebar } = useRightSidebarStore();
	const { setSelectedTodo } = useTodoStore();

	const handleCloseRightSidebar = () => {
		closeRightSidebar();
		setSelectedTodo(null);
	};
	return (
		<button onClick={handleCloseRightSidebar} aria-label="Close Todo Menu">
			<ArrowBigRightDashIcon />
		</button>
	);
}
