'use client';

import { memo } from 'react';
import { TodoList } from '@/types';
import useLeftSidebarStore from '@/context/LeftSidebarContext';
import TodoListSidebarToggle from '../TodoListSidebar/TodoListSidebarToggle';

interface TodoListHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodoListHeaderProps) {
	const { isLeftSidebarOpen } = useLeftSidebarStore();

	return (
		<div className="flex gap-4 items-center">
			{!isLeftSidebarOpen && <TodoListSidebarToggle />}
			<p className="text-lg font-bold">
				{todolist.title} #{todolist.id}
			</p>
		</div>
	);
}

export default memo(TodoListHeader);
