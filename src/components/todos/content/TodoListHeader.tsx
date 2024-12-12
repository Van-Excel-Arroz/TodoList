'use client';

import { memo } from 'react';
import { TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../todolists-sidebar/content/TodoListsSidebarToggle';
import { List } from 'lucide-react';

interface TodoListHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();

	return (
		<div className="flex gap-2 items-center">
			{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : <List />}
			<p className="text-lg font-bold text-ellipsis overflow-hidden w-[50vw]">{todolist.title}</p>
		</div>
	);
}

export default memo(TodoListHeader);
