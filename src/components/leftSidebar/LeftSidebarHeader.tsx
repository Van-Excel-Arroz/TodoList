'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House } from 'lucide-react';
import { format } from 'date-fns';
import SidebarToggle from '../SidebarToggle';

export default function LeftSidebarHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';
	return (
		<div className="flex justify-between">
			<div className="flex gap-4 items-center">
				{!isHome && <SidebarToggle />}
				<Link href="/" className="text-lg font-bold" aria-label="home">
					<House />
				</Link>
			</div>

			<div className="flex flex-col">
				<div className="text-xl flex justify-end font-semibold">{format(new Date(), `h:mm a`)} </div>
				<div className="text-sm flex justify-end">{format(new Date(), `EEEE, MMMM d`)}</div>
			</div>
		</div>
	);
}
