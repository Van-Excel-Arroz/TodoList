'use client';

import useRightSidebarStore from '@/context/RightSidebarContext';
import { House } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
	const { closeRightSidebar } = useRightSidebarStore();
	return (
		<div className="bg-white border-b-2 border-b-slate-200 h-14 px-6 flex items-center gap-4">
			<Link
				href="/"
				className="text-lg font-bold"
				aria-label="home"
				onClick={() => {
					closeRightSidebar();
				}}
			>
				<House />
			</Link>
			<p>TodoList App</p>
		</div>
	);
}
