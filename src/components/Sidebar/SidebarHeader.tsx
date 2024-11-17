'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { memo } from 'react';
import SidebarToggle from '../SidebarToggle';

function SidebarHeader() {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';
	return (
		<div className="flex gap-4 items-center">
			{!isHome && <SidebarToggle />}
			<Link href="/" className="text-lg font-bold" aria-label="home">
				<AiOutlineHome size={27} />
			</Link>
		</div>
	);
}

export default memo(SidebarHeader);
