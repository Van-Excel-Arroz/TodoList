'use client';

import RightSidebarHeader from './RightSidebarHeader';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';

export default function RightSidebarPage() {
	const { selectedTodo } = useTodoStore();
	const { isRightSidebarOpen } = useRightSidebarStore();

	return (
		<div
			className={`font-body l drop-shadow-xl bg-white pb-9 pt-6 h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden ${
				isRightSidebarOpen ? 'w-72' : 'w-0'
			}`}
		>
			<RightSidebarHeader />
			<p>{selectedTodo?.task_text}</p>
		</div>
	);
}
