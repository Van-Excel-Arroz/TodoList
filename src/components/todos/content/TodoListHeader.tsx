'use client';

import { memo } from 'react';
import { Category, TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../todolists-sidebar/content/TodoListsSidebarToggle';
import { List } from 'lucide-react';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';

interface TodoListHeaderProps {
	todolist: TodoList;
	selectedCategories: Category[];
}

function TodoListHeader({ todolist, selectedCategories }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();

	return (
		<div className="sticky top-0 bg-white z-50">
			<div className="flex items-center gap-2 py-5">
				{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : <List />}
				<p className="text-lg font-bold text-ellipsis overflow-hidden w-[50vw]">{todolist.title}</p>
				<TodoFilter selectedCategories={selectedCategories} todoListId={todolist.id} />
			</div>
			<TodoForm todolistId={todolist.id} />
		</div>
	);
}

export default memo(TodoListHeader);
