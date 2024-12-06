'use client';

import { memo } from 'react';
import { TodoList } from '@/types';
import TodoListSidebarToggle from '../todolist-sidebar/content/TodoListSidebarToggle';
import useTodoListSidebarStore from '@/context/TodoListSidebarContext';

interface TodoListHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodoListHeaderProps) {
	const { isTodoListSidebarOpen } = useTodoListSidebarStore();

	return (
		<div className="flex gap-4 items-center">
			{!isTodoListSidebarOpen && <TodoListSidebarToggle />}
			<p className="text-lg font-bold">
				{todolist.title} #{todolist.id}
			</p>
		</div>
	);
}

export default memo(TodoListHeader);
