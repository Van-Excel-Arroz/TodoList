'use client';

import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import TodoListsSidebarToggle from '../ui/TodoListsSidebarToggle';
import { useEffect, useState } from 'react';

export default function TodoListsHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex justify-between">
			<div className="flex flex-col">
				<div className="text-xl flex justify-start font-semibold">{format(currentTime, `h:mm a`)} </div>
				<div className="text-sm">{format(currentTime, `EEEE, MMMM d`)}</div>
			</div>
			{!isHome && <TodoListsSidebarToggle />}
		</div>
	);
}
