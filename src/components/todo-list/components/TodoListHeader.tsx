'use client';

import { memo, useEffect } from 'react';
import { TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../sidebar/ui/TodoListsSidebarToggle';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import useTodoListStore from '@/context/TodoListContext';

interface TodoListHeaderProps {
	todolist: TodoList;
}

function TodoListHeader({ todolist }: TodoListHeaderProps) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	const { setTodoList, todolist: currentTodolist } = useTodoListStore();
	useEffect(() => {
		if (todolist) setTodoList(todolist);
	}, [todolist, setTodoList]);

	return (
		<div className="sticky top-0 bg-white z-50 px-6">
			<div className="flex justify-between pt-5 py-2">
				<div className="flex items-center gap-2">
					{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
					<p className="text-lg font-bold">{currentTodolist?.title}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button ariaLabel="Sort">
						<ArrowDownUp size={20} />
					</Button>
					<TodoFilter />
				</div>
			</div>
			<TodoForm todolistId={todolist.id} />
		</div>
	);
}

export default memo(TodoListHeader);
