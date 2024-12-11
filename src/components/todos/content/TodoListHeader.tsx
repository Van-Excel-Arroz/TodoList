'use client';

import { memo } from 'react';
import { TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../todolists-sidebar/content/TodoListsSidebarToggle';

interface TodoListHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();

	return (
		<div className="flex gap-4 items-center">
			{!isTodoListsSidebarOpen && <TodoListsSidebarToggle />}
			<p className="text-lg font-bold text-ellipsis overflow-hidden w-[50vw]">{todolist.title}</p>
		</div>
	);
}

export default memo(TodoListHeader);
