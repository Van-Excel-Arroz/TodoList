'use client';

import RightSidebarWrapper from './RightSidebarWrapper';
import RightSidebarHeader from './RightSidebarHeader';
import useTodoStore from '@/context/todoContext';

export default function RightSidebarPage() {
	const { selectedTodo } = useTodoStore();
	return (
		<RightSidebarWrapper>
			<RightSidebarHeader />
			<p>{selectedTodo?.task_text}</p>
		</RightSidebarWrapper>
	);
}
