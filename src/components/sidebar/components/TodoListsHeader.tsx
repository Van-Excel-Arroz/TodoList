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
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(now);
			const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
			const timer = setTimeout(updateTime, msUntilNextMinute);
			return () => clearTimeout(timer);
		};
		updateTime();
	}, []);

	const timeString = format(currentTime, 'h:mm a');
	const dateString = format(currentTime, 'EEEE, MMMM d');

	return (
		<div className="flex items-center justify-between py-4 border-b border-slate-300">
			<div className="flex flex-col">
				<div className="text-xl flex justify-start font-semibold" aria-live="polite" aria-atomic="true">
					{timeString}
				</div>
				<div className="text-sm">{dateString}</div>
			</div>
			{!isHome && <TodoListsSidebarToggle />}
		</div>
	);
}
