'use client';

import { memo } from 'react';
import { Category, TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../todolists-sidebar/content/TodoListsSidebarToggle';
import TodoForm from './components/TodoForm';
import TodoFilter from './TodoFilter';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TodoListHeaderProps {
	todolist: TodoList;
	selectedCategories: Category[];
}

function TodoListHeader({ todolist, selectedCategories }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();

	return (
		<div className="sticky top-0 bg-white z-50 px-6">
			<div className="flex justify-between pt-5 py-2">
				<div className="flex items-center gap-2">
					{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
					<p className="text-lg font-bold">{todolist.title}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button ariaLabel="Sort">
						<ArrowDownUp size={20} />
					</Button>
					<TodoFilter selectedCategories={selectedCategories} todoListId={todolist.id} />
				</div>
			</div>
			<TodoForm todolistId={todolist.id} />
		</div>
	);
}

export default memo(TodoListHeader);
