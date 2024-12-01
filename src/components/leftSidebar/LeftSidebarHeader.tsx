'use client';

import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import SidebarToggle from '../SidebarToggle';

export default function LeftSidebarHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';
	return (
		<div className="flex justify-between">
			{!isHome && <SidebarToggle />}

			<div className="flex flex-col">
				<div className="text-xl flex justify-end font-semibold">{format(new Date(), `h:mm a`)} </div>
				<div className="text-sm flex justify-end">{format(new Date(), `EEEE, MMMM d`)}</div>
			</div>
		</div>
	);
}
