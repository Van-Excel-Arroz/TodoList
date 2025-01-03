'use client';

import { memo, useEffect } from 'react';
import { TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../sidebar/ui/TodoListsSidebarToggle';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import useTodoListStore from '@/context/TodoListContext';
import TodoSort from './TodoSort';
import { ArrowUpDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import { useSearchParams, useRouter } from 'next/navigation';

function TodoListHeader({ todolist }: { todolist: TodoList }) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	const { setTodoList, todolist: currentTodolist } = useTodoListStore();
	const router = useRouter();
	const searchParams = useSearchParams();

	const dueDate = searchParams.get('sort')?.split(':')[0];

	useEffect(() => {
		if (todolist) setTodoList(todolist);
	}, [todolist, setTodoList]);

	const handleSortToggle = () => {
		const newOrder = dueDate === 'desc' ? 'asc' : 'desc';
		const params = new URLSearchParams(searchParams.toString());
		params.set('sort', `dueDate:${newOrder}`);
		router.push(`/tasks/?${params.toString()}`);
	};

	const handleRemoveSort = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('sort');
		router.push(`/tasks/?${params.toString()}`);
	};

	return (
		<div className="sticky top-0 bg-slate-100 z-50 px-6">
			<div className="flex justify-between items-center pt-2">
				<div className="flex items-center gap-2">
					{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
					<p className="text-lg font-bold">{currentTodolist?.title}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button ariaLabel="Search">
						<Search />
					</Button>
					<TodoSort todolistId={todolist.id} />
					<TodoFilter todolistId={todolist.id} />
				</div>
			</div>
			{dueDate && (
				<div className="inline-block mb-3 p-1 bg-slate-200 text-slate-700 rounded-lg">
					<div className="flex items-center gap-1">
						<Button ariaLabel="Reverse Sort Order" onClick={handleSortToggle}>
							<ArrowUpDown size={14} />
						</Button>
						<p className="text-xs">Due Date ({dueDate === 'desc' ? 'Latest' : 'Earlier'} first)</p>
						<Button ariaLabel="Remove Due Date Sort" onClick={handleRemoveSort}>
							<X size={12} />
						</Button>
					</div>
				</div>
			)}

			<TodoForm todolistId={todolist.id} />
		</div>
	);
}

export default memo(TodoListHeader);
