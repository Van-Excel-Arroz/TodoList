'use client';

import { memo } from 'react';
import { Category, TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../sidebar/ui/TodoListsSidebarToggle';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoSort from './TodoSort';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import TodoControls from './TodoControls';
import useTodoListsStore from '@/context/TodoListsContext';

interface TodoListHeaderProps {
	todolistId: number;
	categories: Category[];
}

function TodoListHeader({ todolistId, categories }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	const { getTodoListById } = useTodoListsStore();

	const todolist = getTodoListById(todolistId);

	return (
		<div className="sticky top-0 bg-slate-100 z-50 px-6">
			<div className="flex justify-between items-center py-2">
				<div className="flex items-center gap-2">
					{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
					<p className="text-lg font-bold">{todolist.title}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button ariaLabel="Search">
						<Search />
					</Button>
					<TodoSort todolistId={todolistId} />
					<TodoFilter todolistId={todolistId} categories={categories} />
				</div>
			</div>
			<TodoControls />
			<TodoForm todolistId={todolistId} />
		</div>
	);
}

export default memo(TodoListHeader);
