'use client';

import { memo } from 'react';
import { TodoList } from '@/types';
import TodoListSidebarToggle from '../../todolists-sidebar/content/TodoListsSidebarToggle';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';

interface TodoListHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();

	return (
		<div className="flex gap-4 items-center">
			{!isTodoListsSidebarOpen && <TodoListSidebarToggle />}
			<p className="text-lg font-bold">
				{todolist.title} #{todolist.id}
			</p>
		</div>
	);
}

export default memo(TodoListHeader);
