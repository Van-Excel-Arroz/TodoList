'use client';

import TodoListsSidebarToggle from '@/components/sidebar/ui/TodoListsSidebarToggle';

export default function FilteredTodosHeader({ title }: { title: string }) {
	return (
		<>
			<div className="z-50 px-6 bg-white border-b border-slate-300 flex items-center py-[19px] gap-2">
				<TodoListsSidebarToggle />
				<p className="text-xl font-bold">{title}</p>
			</div>
		</>
	);
}
