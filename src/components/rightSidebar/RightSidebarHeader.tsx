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
		<div className="flex items-center justify-between mt-1">
			<button onClick={handleCloseRightSidebar} aria-label="Close Todo Menu">
				<ArrowBigRightDashIcon />
			</button>
			<p className="text-xl font-medium">Details</p>
		</div>
	);
}
