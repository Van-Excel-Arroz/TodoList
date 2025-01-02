'use client';

import { memo, useEffect } from 'react';
import { TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../sidebar/ui/TodoListsSidebarToggle';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import useTodoListStore from '@/context/TodoListContext';
import TodoSort from './TodoSort';

function TodoListHeader({ todolist }: { todolist: TodoList }) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	const { setTodoList, todolist: currentTodolist } = useTodoListStore();
	useEffect(() => {
		if (todolist) setTodoList(todolist);
	}, [todolist, setTodoList]);

	return (
		<div className="sticky top-0 bg-slate-100  z-50 px-6">
			<div className="flex justify-between items-center pt-3 py-2">
				<div className="flex items-center gap-2">
					{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
					<p className="text-lg font-bold py-2">{currentTodolist?.title}</p>
				</div>
				<div className="flex items-center gap-2">
					<TodoSort />
					<TodoFilter />
				</div>
			</div>
			<TodoForm todolistId={todolist.id} />
		</div>
	);
}

export default memo(TodoListHeader);
