'use client';

import RightSidebarWrapper from './RightSidebarWrapper';
import RightSidebarHeader from './RightSidebarHeader';
import useTodoStore from '@/context/todoContext';
import useRightSidebarStore from '@/context/RightSidebarContext';

export default function RightSidebarPage() {
	const { selectedTodo } = useTodoStore();
	const { closeRightSidebar } = useRightSidebarStore();

	if (!selectedTodo) {
		closeRightSidebar();
		return null;
	}

	return (
		<RightSidebarWrapper>
			<RightSidebarHeader />
			<p>{selectedTodo?.task_text}</p>
		</RightSidebarWrapper>
	);
}
