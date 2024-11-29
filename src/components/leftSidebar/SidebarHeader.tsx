'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House } from 'lucide-react';
import SidebarToggle from '../SidebarToggle';

export default function SidebarHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';
	return (
		<div className="flex gap-4 items-center">
			{!isHome && <SidebarToggle />}
			<Link href="/" className="text-lg font-bold" aria-label="home">
				<House />
			</Link>
		</div>
	);
}
