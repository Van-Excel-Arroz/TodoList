'use client';

import useRightSidebarStore from '@/context/RightSidebarContext';
import useTodoStore from '@/context/TodoContext';
import { ArrowBigRightDashIcon } from 'lucide-react';

export default function TodoDetailsHeader() {
	const { closeRightSidebar } = useRightSidebarStore();
	const { setSelectedTodo } = useTodoStore();

	const handleCloseRightSidebar = () => {
		closeRightSidebar();
		setSelectedTodo(null);
	};
	return (
		<div className="flex items-center mt-1">
			<button onClick={handleCloseRightSidebar} aria-label="Close Todo Menu">
				<ArrowBigRightDashIcon />
			</button>
			<p className="flex-1 text-xl font-medium text-center px-6">Details</p>
			<div className="flex-none w-[24px]"></div>
		</div>
	);
}
