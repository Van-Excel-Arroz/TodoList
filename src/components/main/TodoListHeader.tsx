'use client';

import { memo } from 'react';
import { TodoList } from '@/types';
import useSidebarStore from '../../Context/SidebarContext';
import SidebarToggle from '../SidebarToggle';

interface TodoListHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodoListHeaderProps) {
	const { isSidebarOpen } = useSidebarStore();

	return (
		<div className="flex gap-4 items-center">
			{!isSidebarOpen && <SidebarToggle />}
			<p className="text-lg font-bold">
				{todolist.title} #{todolist.id}
			</p>
		</div>
	);
}

export default memo(TodoListHeader);
