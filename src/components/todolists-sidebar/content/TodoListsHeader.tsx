'use client';

import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import TodoListSidebarToggle from './TodoListSidebarToggle';

export default function TodoListsHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';
	return (
		<div className="flex justify-between">
			<div className="flex flex-col">
				<div className="text-xl flex justify-start font-semibold">{format(new Date(), `h:mm a`)} </div>
				<div className="text-sm">{format(new Date(), `EEEE, MMMM d`)}</div>
			</div>
			{!isHome && <TodoListSidebarToggle />}
		</div>
	);
}
