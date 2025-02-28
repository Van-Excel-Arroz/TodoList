'use client';

import TodoListsSidebarToggle from '@/components/sidebar/ui/TodoListsSidebarToggle';
import TodoFilter from '@/components/todo-list/components/TodoFilter';
import TodoSort from '@/components/todo-list/components/TodoSort';
import { Button } from '@/components/ui-shared/Button';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import { Search } from 'lucide-react';

export default function PriorityHeader() {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();


	return (
		<div className="z-50 px-6 bg-white border-b border-slate-300">
			<div className='flex items-center gap-2 px-1 pt-2'>
				{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
				<p className="text-xl font-bold">Priority</p>
			</div>
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 w-60 pt-2">
					<Button ariaLabel="Search">
						<Search size={20} />
					</Button>
					<input
						type="text"
						className="px-2 py-1 text-md border-b-2 focus:outline-none focus:border-slate-500 hover:border-slate-400 border-slate-300"
						placeholder="Search tasks..."
					/>
				</div>
				<div className="flex items-center gap-4 pt-2">
					<TodoSort />
					<TodoFilter />
				</div>
			</div>
		</div>
	);
}
