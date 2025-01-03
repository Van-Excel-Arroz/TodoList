'use client';

import { memo, useEffect, useState } from 'react';
import { TodoList } from '@/types';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import TodoListsSidebarToggle from '../../sidebar/ui/TodoListsSidebarToggle';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import useTodoListStore from '@/context/TodoListContext';
import TodoSort from './TodoSort';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function TodoListHeader({ todolist }: { todolist: TodoList }) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();
	const { setTodoList, todolist: currentTodolist } = useTodoListStore();
	const router = useRouter();
	const searchParams = useSearchParams();
	const dueDate = searchParams.get('due-date');
	const [order, setOrder] = useState(false);

	useEffect(() => {
		if (todolist) setTodoList(todolist);
	}, [todolist, setTodoList]);

	return (
		<div className="sticky top-0 bg-slate-100  z-50 px-6">
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
					<div className=" flex items-center gap-1">
						<Link
							href={`/tasks/?id=${todolist.id}&due-date=${order ? 'asc' : 'desc'}`}
							onClick={() => setOrder(prev => !prev)}
						>
							{order ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
						</Link>
						<p className="text-xs">Due Date ({order ? 'Earlier' : 'Latest'} first)</p>
						<Button ariaLabel="Remove Due Date Sort" onClick={() => router.push(`/tasks/?id=${todolist.id}`)}>
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
