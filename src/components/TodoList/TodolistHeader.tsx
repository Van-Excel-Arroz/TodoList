'use client';

import { memo } from 'react';
import useSidebarStore from '../Context/SidebarContext';
import SidebarToggle from '../SidebarToggle';
import { TodoList } from '@/types';

interface TodolistHeaderProps {
	todolist: TodoList;
}

function TodolistHeader({ todolist }: TodolistHeaderProps) {
	const { isSidebarOpen } = useSidebarStore();

	return (
		<div className="flex gap-4">
			{!isSidebarOpen && <SidebarToggle />}
			<p className="text-lg font-bold">
				{todolist.title} #{todolist.id}
			</p>
		</div>
	);
}

export default memo(TodolistHeader);
