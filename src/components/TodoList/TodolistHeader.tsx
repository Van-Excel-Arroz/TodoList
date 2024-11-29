'use client';

import { memo } from 'react';
import useSidebarStore from '../Context/SidebarContext';
import { TodoList } from '@/types';
import SidebarToggle from '../SidebarToggle';

interface TodolistHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodolistHeaderProps) {
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
