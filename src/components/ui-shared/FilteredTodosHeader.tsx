'use client';

import TodoListsSidebarToggle from '@/components/sidebar/ui/TodoListsSidebarToggle';
import TodoFilter from '@/components/todo-list/components/TodoFilter';
import TodoSort from '@/components/todo-list/components/TodoSort';
import useTodoListsSidebarStore from '@/context/TodoListsSidebarContext';
import LayoutButtons from './LayoutButtons';

export default function FilteredTodosHeader({ title }: { title: string }) {
	const { isTodoListsSidebarOpen } = useTodoListsSidebarStore();

	return (
		<div className="z-50 px-6 bg-white border-b border-slate-300 flex items-center justify-between py-2">
			<div className="flex items-center gap-2 px-1">
				{!isTodoListsSidebarOpen ? <TodoListsSidebarToggle /> : null}
				<p className="text-xl font-bold">{title}</p>
				<LayoutButtons param="smart-list" />
			</div>
			<div className="flex items-center gap-4 pt-2">
				<TodoSort />
				<TodoFilter />
			</div>
		</div>
	);
}
