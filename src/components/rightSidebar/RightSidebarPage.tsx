'use client';

import RightSidebarHeader from './RightSidebarHeader';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';

export default function RightSidebarPage() {
	const { selectedTodo } = useTodoStore();
	const { isRightSidebarOpen } = useRightSidebarStore();

	return (
		<div
			className={`border-l-2 rounded-l-3xl bg-white h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden ${
				isRightSidebarOpen ? 'w-72' : 'w-0'
			}`}
		>
			<RightSidebarHeader />
			<p>{selectedTodo?.task_text}</p>
		</div>
	);
}
