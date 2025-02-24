'use client';

import TodoFilter from '@/components/todo-list/components/TodoFilter';
import TodoSort from '@/components/todo-list/components/TodoSort';
import { Button } from '@/components/ui-shared/Button';
import { Search } from 'lucide-react';

export default function PriorityHeader() {
	return (
		<div>
			<p className="text-lg font-bold p-2">Priority Page</p>
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
