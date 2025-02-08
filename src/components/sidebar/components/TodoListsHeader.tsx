'use client';

import { usePathname } from 'next/navigation';

import TodoListsSidebarToggle from '../ui/TodoListsSidebarToggle';

export default function TodoListsHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';

	return (
		<div className="flex items-center justify-between py-4 border-b border-slate-300">
			<div className="flex flex-col"></div>
			{!isHome && <TodoListsSidebarToggle />}
		</div>
	);
}
