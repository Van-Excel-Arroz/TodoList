'use client';

import RightSidebarHeader from './RightSidebarHeader';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';

export default function RightSidebarPage() {
	const { selectedTodo } = useTodoStore();
	const { isRightSidebarOpen } = useRightSidebarStore();

	return (
		<div
			className={`bg-white pb-9 pt-6 h-screen transition-all duration-200 ease-in-out overflow-hidden ${
				isRightSidebarOpen ? 'w-80' : 'w-0'
			}`}
		>
			<RightSidebarHeader />
			<p>{selectedTodo?.task_text}</p>
		</div>
	);
}
