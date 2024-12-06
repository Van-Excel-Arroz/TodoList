'use client';

import useTodoStore from '@/context/TodoContext';
import useTodoDetailsPanelStore from '@/context/TodoDetailsPanelContext';
import { ArrowBigRightDashIcon } from 'lucide-react';

export default function TodoDetailsHeader() {
	const { closeTodoDetailsPanel } = useTodoDetailsPanelStore();
	const { setSelectedTodo } = useTodoStore();

	const handleCloseRightSidebar = () => {
		closeTodoDetailsPanel();
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
